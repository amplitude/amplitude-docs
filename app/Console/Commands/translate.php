<?php

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
use function Laravel\Prompts\spin;
use function Laravel\Prompts\progress;

class translate extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:translate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    function deepl($content, $language){
        $authKey = getenv('DEEPL_API_KEY'); 
        $translator = new \DeepL\Translator($authKey);
        $translated_content =  $translator->translateText($content, null, $language, ["model_type" => "prefer_quality_optimized"]);

        return $translated_content;
    } 

    function extractTranslatableContent($content) {
        $placeholders = [];
        $parts = [];
        $index = 0;
    
        // Replace {{...}} content with placeholders and store them
        $processedContent = preg_replace_callback('/{{(.*?)}}/', function($matches) use (&$placeholders, &$index) {
            $key = "%%PLACEHOLDER_$index%%";
            $placeholders[$key] = $matches[0]; // Store the entire {{...}}
            $index++;
            return $key; // Replace with a placeholder
        }, $content);
    
        // Split the remaining content by lines
        $lines = preg_split("/\r\n|\n|\r/", $processedContent);
        foreach ($lines as $line) {
            if (trim($line) !== '') {
                $parts[] = trim($line);
            }
        }
    
        return ['parts' => $parts, 'placeholders' => $placeholders];
    }

    function reassembleContent($translatedParts, $placeholders) {
        // Combine translated parts into a single document
        $content = implode("\n", $translatedParts);
    
        // Replace placeholders with their original {{...}} content
        foreach ($placeholders as $key => $value) {
            $content = str_replace($key, $value, $content);
        }
    
        return $content;
    }


    function translate($article_id, $locales)
    {
        $entry = Entry::find($article_id);
        $content = $entry->get('content');
        $title = $entry->title;
        $goals = $entry->get('this_article_will_help_you');
        $collectionHandle = $entry->collection;
        $blueprint = $entry->blueprint;
        $slug = $entry->slug;
        $goals_translated = [];

        $extractionResult = translate::extractTranslatableContent($content);
        $translatableParts = $extractionResult['parts'];
        $placeholders = $extractionResult['placeholders'];  
        $contentSize = count($translatableParts);

        foreach ($locales as $locale) {
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

            $title_translated = translate::deepl($title, $language);
            foreach($goals as $goal) {
                $goal_translated = translate::deepl($goal, $language);
                array_push($goals_translated, $goal_translated->text);
            }
                
            $progress = progress(label: 'Translating content', steps: $contentSize);
            $progress->start();
            $translatedParts = array_map(function($part) use ($progress) {
                $translation = translate::deepl($part, 'ja');
                $progress->advance();
                return $translation;
            }, $translatableParts);
            
            $finalContent = translate::reassembleContent($translatedParts, $placeholders);

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

    public function siteSelect() {
        $sites = multiselect(
            label: 'Which locales do you want to translate to?',
            options: [
                'ko' => 'Korean',
                'jp' => 'Japanese'
            ],
            required: true
        ); 

        return $sites;
    }
    /**
     * Execute the console command.
     */
    public function handle()
    {

        $article_id = text(
            label: 'Enter the ID of the article to translate',
            required: true
        );

        $locales = translate::siteSelect();


        translate::translate($article_id, $locales);
        exit();
    }
}
