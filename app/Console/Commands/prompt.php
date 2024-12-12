<?php
/**
 * TODO:
 *  1. Hide already translated items from the collection table
 */
namespace App\Console\Commands;

use Illuminate\Console\Command;
use Statamic\Facades\Collection;
use Statamic\Facades\Entry;
use Illuminate\Support\Str;
use Statamic\Facades\Site;
use OpenAI;
use function Laravel\Prompts\multisearch;
use function Laravel\Prompts\table;
use function Laravel\Prompts\select;
use function Laravel\Prompts\text;
use function Laravel\Prompts\multiselect;
use function Laravel\Prompts\info;
use function Laravel\Prompts\confirm;


class prompt extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:prompt';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * This function handles the translation
     * Takes article ID and locales as input
     */


    public function deepl($content, $language){
        $authKey = getenv('DEEPL_API_KEY'); 
        $translator = new \DeepL\Translator($authKey);
        return $translator->translateText($content, null, $language, ["model_type" => "prefer_quality_optimized"]);
    } 

    public function openai($content, $language){
        $authKey = getenv('OPENAI_API_KEY');
        $client = OpenAI::client($authKey);

        $systemPrompt = "You are a professional translator with expertise in technical documentation and marketing content. 
        Translate the following text while:
        1. Maintaining all markdown formatting
        2. Preserving any HTML tags
        3. Keeping code snippets unchanged
        4. Ensuring cultural appropriateness
        5. Maintaining the original tone and style
        6. Preserving any special placeholders or variables
        7. Ignore any content between {{ and }}.
        
        Translate only the human-readable text.";

        $text = $content;

        $messages = array(
           array("role"=> "system", "content"=> $systemPrompt),
           array("role"=> "user", "content"=> "Translate the following text to {$language}. Preserve all formatting, markdown, and special characters:\n\n{$text}")
        );

        $response = $client->chat()->create([
            'model'=> 'gpt-4',
            'messages'=> $messages,
            'temperature' => 0.3,
            'max_tokens' => 2000
        ]);

        return $response->choices[0]->message->content;


    }

    public function selectTranslator($translator, $content, $language){
        switch ($translator) {
            case 'deepl':
                prompt::deepl($content, $language);
                break;
            
            case 'openai':
                prompt::openai($content, $language);
                break;
        }
    }

    public function translate($article_id, $locales) {
        
        $debug = false;
            
        $entry = Entry::find($article_id);
        $content = $entry->get('content');
        $title = $entry->title;
        $goals = $entry->get('this_article_will_help_you');
        $collectionHandle = $entry->collection;
        $blueprint = $entry->blueprint;
        $slug = $entry->slug;
        $exists = false;

        $goals_translated = [];

        $translator = select('Which service do you want to use to translate?',
        options: [
            'deepl' => 'DeepL',
            'openai' => 'OpenAI']
        );


        // Run translation for each locale passed
        foreach ($locales as $locale) {

            // Set the site handle and language based on the selection
            switch ($locale) {
                case 'ko':
                    $siteHandle = 'ko';
                    $language = 'KO';
                    break;
                case 'jp':
                    $siteHandle = 'jp';
                    $language = 'JA';
                    break;
            }
            // Ensure the collection exists
            $collection = Collection::find($collectionHandle->handle);
            if (!$collection) {
                $this->error("Collection '{$collectionHandle}' does not exist.");
                return Command::FAILURE;
            }

            $ignorePatterns = [
                '/\{\{.*?\}\}/su',                        // Ignore text inside {{ }}
                '/!\[(.*?)\]\((.*?)(?:\s+"(.*?)")?\)/su', // markdown image links
                '/\[(.*?)\]\((.*?)\)/su',                // ignore links
            ];
            
            // Extract ignored parts and replace them with unique placeholders
            $ignoredParts = [];
            $preprocessedContent = $content;
            
            foreach ($ignorePatterns as $pattern) {
                $preprocessedContent = preg_replace_callback($pattern, function ($matches) use (&$ignoredParts) {
                    $placeholder = "{{__unique_placeholder_" . count($ignoredParts) . "__}}";
                    $ignoredParts[$placeholder] = $matches[0];
                    return $placeholder;
                }, $preprocessedContent);
            }
            
            // If a translation exists for the languge, show the date it was completed, and give an option to proceed.
            if ($entry->translations) {
                $translation_id = "";
                foreach ($entry->translations as $key => $value) {
                    if ($key === $locale) {
                        $translation_id = $value;
                    }
                }
                $existing_translation = Entry::find($translation_id);
                $last_translated = date('Y-m-d H:i:s',$existing_translation->translated_on);
                $confirm = confirm(
                    label: "This article already had a {$locale} translation and was last translated on {$last_translated}. Continue?"
                );

                if (!$confirm) {
                    info("Exiting");
                    continue;
                }
                $exists = true;
            };

            if (!$debug) {
                try {
                    $title_translated = prompt::selectTranslator($translator, $title, $language);
                    foreach($goals as $goal) {
                        $goal_translated = prompt::selectTranslator($translator, $goal, $language);
                        array_push($goals_translated, $goal_translated->text);
                    }

                    $translatedText = prompt::selectTranslator($translator, $preprocessedContent, $language);
                    $finalContent = $translatedText->text;
                
                    // Replace placeholders with their original content
                    foreach ($ignoredParts as $placeholder => $ignoredPart) {
                        $finalContent = str_replace($placeholder, $ignoredPart, $finalContent);
                    }
                } catch (\Exception $e) {
                    $this->error('Error during translation: ' . $e->getMessage());
                    return Command::FAILURE;
                }

                // If a translation already exists, update it instead of creating a new one.
                if ($exists) {
                    $existing_translation->data(['title' => $title_translated->text, 'origin'=> $article_id, 'this_article_will_help_you' => $goals_translated, 'content' => $finalContent, 'translated_on' => time()]);
                    $existing_translation->save();
                    info("Translation updated.");
                    $exists = false;
                } else {
                // If the translation doesn't exist, make a new entry.    
                $translated_entry = Entry::make()
                                        ->collection($collectionHandle)
                                        ->locale($siteHandle)
                                        ->slug($slug)
                                        ->published(true)
                                        ->data(['title' => $title_translated->text, 'origin'=> $article_id, 'this_article_will_help_you' => $goals_translated, 'content' => $finalContent, 'translated_on' => time()]);

                    if ($translated_entry->save()) {
                        // After successful save, get the entry ID
                        $newEntryId = $translated_entry->id();
                    } else {
                        echo "Failed to save the entry.";
                    }   
                    info("{$title} has been translated to {$locale}. The id of the new entry is {$translated_entry->id()}");
                    // Write back to the original article that a translation exists
                    $original_entry = Entry::find($article_id);
                    $translations = $original_entry->translations;
                    $translations[] = ["locale" => $locale, "id" => $newEntryId];
                    $original_entry->set('translations', $translations)->save();                   
    
                }  
            }

        }

        
    }
    /**
     * Re-usable site selection 
     */
    public function siteSelect() {
        $sites = multiselect(
            label: 'Which locales do you want to translate to?',
            options: [
                'ko' => 'Korean',
                'jp' => 'Japanese'
            ]
        ); 

        return $sites;
    }


    /**
     * Translate by collection
     */
    public function collection() {
        // Get an array of all collections
        $collections = Collection::all();
        $collectionTitles = [];
        foreach ($collections as $object) {
            $collectionTitles[] = $object->handle;    
        }
        // Transform it into a collection
        $collectionsList = collect($collectionTitles);
        
        // Create a multisearch prompt
        $collection =  multisearch(
            label: 'Which collection do you want to translate?',
            options: fn (string $value) => $collectionsList
                ->filter(fn ($title) => Str::contains($title, $value, ignoreCase: true))
                ->values()
                ->all(),
            required: true
        );
                    
        // Get the collection details
        $collectionDetails = Entry::whereCollection($collection[0]);
        $results = [];
        // Iterate through and build the array that powers the table
        foreach ($collectionDetails as $object) {
            if ($object->locale == 'en') {
                $results[] = [
                    'id' => $object->id,
                    'title' => $object->title,
                    'ko' => $object->ko ? '✅' : '❌',
                    'jp' => $object->jp ? '✅' : '❌',
                ];
            }
        }
       
        // Render the info table
        table(
            headers: ['ID', 'Title', 'Korean', 'Japanese'],
            rows: $results
        );

        // Prompt for languages
        $locales = prompt::siteSelect();

        // Run translation on each article in the selected collection
        foreach ($results as $result) {
            prompt::translate($result['id'], $locales);
        }
    }


    /**
     * Run translation on a single article
     */
    public function article() {
        $article_id = text(
            label: 'Enter the ID of the article to translate',
            required: true
        );

        $locales = prompt::siteSelect();

        prompt::translate($article_id, $locales);
        exit();
    }

   
    /**
     * Execute the console command.
     */
    public function handle()
    {

        $method = select(
            label: 'How do you want to translate content?',
            options: ['By article', 'By collection', 'OpenAI Test']
        );


        switch ($method) {
            case 'By article':
                prompt::article();
            case 'By collection':
                prompt::collection();
            case 'OpenAI Test':
                prompt::openai($test);
        };

    }
}
