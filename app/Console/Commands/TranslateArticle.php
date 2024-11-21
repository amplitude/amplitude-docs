<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Statamic\Facades\Entry;
use Deepl\Translator;

class TranslateArticle extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:translate-article';

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

        $article="10d36278-7030-497c-acce-46469b415a93";
        $entry = Entry::find($article);

        // $result = $translator->translateText('Hello, world!', null, 'fr');
        // echo $result->text; // Bonjour, le monde!

        //print($entry->get('content'));

        $result = $translator->translateText($entry->get('content'), null, 'ko');

        print($result);
    }
}
