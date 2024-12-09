<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Statamic\Facades\Collection;
use Statamic\Facades\Entry;
use Illuminate\Support\Str;
use Statamic\Facades\Site;
use function Laravel\Prompts\multisearch;
use function Laravel\Prompts\table;
use function Laravel\Prompts\select;
use function Laravel\Prompts\text;
use function Laravel\Prompts\multiselect;
use function Laravel\Prompts\info;


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

    public function translate($article_id, $locales) {
        $authKey = getenv('DEEPL_API_KEY'); 
        $translator = new \DeepL\Translator($authKey);
        $debug = false;
            
        $entry = Entry::find($article_id);
        $content = $entry->get('content');
        $title = $entry->title;
        $goals = $entry->get('this_article_will_help_you');
        $collectionHandle = $entry->collection;
        $blueprint = $entry->blueprint;
        $slug = $entry->slug;

        $goals_translated = [];

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
            // Translate the preprocessed content

            if (!$debug) {
                try {
                    $title_translated = $translator->translateText($title, null, $language);
                    foreach($goals as $goal) {
                        $goal_translated = $translator->translateText($goal, null, $language);
                        array_push($goals_translated, $goal_translated->text);
                    }

                    $translatedText = $translator->translateText($preprocessedContent, null, $language);
                    $finalContent = $translatedText->text;
                
                    // Replace placeholders with their original content
                    foreach ($ignoredParts as $placeholder => $ignoredPart) {
                        $finalContent = str_replace($placeholder, $ignoredPart, $finalContent);
                    }
                } catch (\Exception $e) {
                    $this->error('Error during translation: ' . $e->getMessage());
                    return Command::FAILURE;
                }

                $translated_entry = Entry::make()
                                        ->collection($collectionHandle)
                                        ->locale($siteHandle)
                                        ->slug($slug)
                                        ->published(true)
                                        ->data(['title' => $title_translated->text, 'origin'=> $article_id, 'this_article_will_help_you' => $goals_translated, 'content' => $finalContent])
                                        ->save();
                }
                info("{$title} has been translated to {$locale}.");
                // Write back to the original article that a translation exists
                $original_entry = Entry::find($article_id);
                $original_entry->set($locale, true)->save();
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
                ->all()
        );
                    
        // Get the collection details
        $collectionDetails = Entry::whereCollection($collection[0]);

        $results = [];
        // Iterate through and build the array that powers the table
        foreach ($collectionDetails as $object) {
            $results[] = [
                'id' => $object->id,
                'title' => $object->title,
                'ko' => $object->ko ? '✅' : '❌',
                'jp' => $object->jp ? '✅' : '❌',
            ];
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
            options: ['By article', 'By collection']
        );

        switch ($method) {
            case 'By article':
                prompt::article();
            case 'By collection':
                prompt::collection();
        };

    }
}
