<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Statamic\Facades\Entry;
use Statamic\Facades\YAML;
use Deepl\Translator;
use Statamic\Facades\Collection;
use Statamic\Facades\Site;

class TranslateArticle extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:translate-article {site}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $authKey = "b71b871b-be23-42ce-8e56-dd297e9d0bb1:fx"; // Replace with your key
        $translator = new \DeepL\Translator($authKey);
        $site = $this->argument('site');

        switch ($site) {
            case 'ko':
                $siteHandle = 'ko';
                $language = 'KO';
                break;
            case 'jp':
                $siteHandle = 'jp';
                $language = 'JA';
                break;
        }
            
    

        $article_id = "19c03845-d834-4777-af7c-904a6fa82cd7";
        $entry = Entry::find($article_id);

        $content = $entry->get('content');
        $title = $entry->title;
        $goals = $entry->get('this_article_will_help_you');
        $collectionHandle = $entry->collection;
        $blueprint = $entry->blueprint;
        $slug = $entry->slug;

        $title_translated = $translator->translateText($title, null, $language);
        $goals_translated = [];

        // Ensure the collection exists
        $collection = Collection::find($collectionHandle->handle);
        if (!$collection) {
            $this->error("Collection '{$collectionHandle}' does not exist.");
            return Command::FAILURE;
        }

        // Ensure the site exists
        $site = Site::get($siteHandle);
        if (!$site) {
            $this->error("Site '{$siteHandle}' does not exist.");
            return Command::FAILURE;
        }

        foreach($goals as $goal) {
            $goal_translated = $translator->translateText($goal, null, $language);
            array_push($goals_translated, $goal_translated->text);
        }

        $ignorePatterns = [
            '/\{\{.*?\}\}/u',                        // Ignore text inside {{ }}
            '/!\[(.*?)\]\((.*?)(?:\s+"(.*?)")?\)/u', // markdown image links
            '/\[(.*?)\]\((.*?)\)/u',                // ignore links
        ];
        
        // Extract ignored parts and replace them with unique placeholders
        $ignoredParts = [];
        $preprocessedContent = $content;
        
        foreach ($ignorePatterns as $pattern) {
            $preprocessedContent = preg_replace_callback($pattern, function ($matches) use (&$ignoredParts) {
                $placeholder = "{{placeholder_" . count($ignoredParts)."}}"; // Generate a unique placeholder
                $ignoredParts[$placeholder] = $matches[0]; // Store the ignored text
                return $placeholder; // Replace with the unique placeholder
            }, $preprocessedContent);
        }
        // Translate the preprocessed content
        $translatedText = $translator->translateText($preprocessedContent, null, $language);
        
        // Reintegration: Replace placeholders with their original ignored text
       $finalContent = $translatedText->text;
        foreach ($ignoredParts as $placeholder => $ignoredPart) {
            $finalContent = str_replace($placeholder, $ignoredPart, $finalContent);
        }

        $translated_entry = Entry::make()
                            ->collection($collectionHandle)
                            ->locale($siteHandle)
                            ->slug($slug)
                            ->published(true)
                            ->data(['title' => $title_translated->text, 'origin'=> $article_id, 'this_article_will_help_you' => $goals_translated, 'content' => $finalContent])
                            ->save();
    }                   
}   
