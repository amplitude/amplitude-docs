<?php

namespace App\Actions;

use Statamic\Actions\Action;
use Statamic\Contracts\Entries\Entry;
use Statamic\Facades\Entry as EntryAPI;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;
use OpenAI; // Official OpenAI PHP Client
use OpenAI\Exceptions\ErrorException as OpenAIErrorException;

class AISummarize extends Action
{
    protected const CONTENT_FIELD = 'content';
    protected const SUMMARY_FIELD = 'ai_summary';

    public static function title()
    {
        return __("Summarize with AI");
    }

    public function visibleTo($item)
    {
        return $item instanceof Entry;
    }

    /**
     * The run method
     *
     * @return mixed
     */
    public function run($items, $values)
    {
        $items->each(function ($entry) {
            if (!$entry instanceof Entry) {
                return;
            }

            $contentToSummarize = $entry->get(self::CONTENT_FIELD);

            if (empty($contentToSummarize)) {
                Log::info("[OpenAISummarizer] Entry ID {$entry->id()} has no content in field '" . self::CONTENT_FIELD . "'. Skipping.");
                return;
            }

            $textContent = $this->extractText($contentToSummarize);

            if (empty(trim($textContent))) {
                Log::info("[OpenAISummarizer] Entry ID {$entry->id()} has no extractable text in field '" . self::CONTENT_FIELD . "'. Skipping.");
                return;
            }

            try {
                $summary = $this->fetchSummaryFromOpenAI($textContent);

                if ($summary) {
                    $mutableEntry = EntryAPI::find($entry->id());
                    $mutableEntry->set(self::SUMMARY_FIELD, $summary);
                    $mutableEntry->save();
                    Log::info("[OpenAISummarizer] Successfully summarized and updated Entry ID {$entry->id()}.");
                } else {
                    Log::warning("[OpenAISummarizer] Failed to get a valid summary from OpenAI for Entry ID {$entry->id()}.");
                }
            } catch (\Exception $e) {
                Log::error("[OpenAISummarizer] Error processing Entry ID {$entry->id()}: " . $e->getMessage());
                // For a better user experience in the CP, you might want to collect errors
                // and return them, rather than just logging.
            }
        });
        return __('Summary generated 🫡');
    }

    /**
     * Extracts plain text from various field types.
     * Customize this based on the fieldtypes you use for your 'content' field.
     *
     * @param mixed $contentFieldData The data from the content field.
     * @return string
     */
    protected function extractText($contentFieldData): string
    {
        if (is_string($contentFieldData)) {
            return strip_tags($contentFieldData);
        }

        if (is_array($contentFieldData)) {
            // Simplified example for Bard-like fieldtypes (array of sets)
            $textBlocks = [];
            foreach ($contentFieldData as $set) {
                if (isset($set['type'])) {
                    switch ($set['type']) {
                        case 'text':
                        case 'paragraph':
                        case 'heading':
                            if (isset($set['text']) && is_string($set['text'])) {
                                $textBlocks[] = strip_tags($set['text']);
                            } elseif (isset($set['content']) && is_array($set['content'])) {
                                // Handle ProseMirror structure often found in Bard's 'text' type
                                foreach ($set['content'] as $proseItem) {
                                    if (isset($proseItem['type']) && $proseItem['type'] === 'text' && isset($proseItem['text'])) {
                                        $textBlocks[] = strip_tags($proseItem['text']);
                                    }
                                }
                            }
                            break;
                        case 'code_block':
                            // You might want to exclude code blocks or handle them differently
                            break;
                        // Add more cases for other set types (e.g., 'image' for alt text, 'quote')
                        // case 'quote':
                        //     if (isset($set['quote']) && is_string($set['quote'])) {
                        //         $textBlocks[] = strip_tags($set['quote']);
                        //     }
                        //     break;
                    }
                }
            }
            return implode("\n\n", $textBlocks); // Join paragraphs with double newlines
        }
        return ''; // Default fallback
    }

    /**
     * Fetches a summary from the OpenAI API.
     *
     * @param string $text The text to summarize.
     * @return string|null The summary, or null on failure.
     * @throws \Exception If the API key is missing or API call fails.
     */
    protected function fetchSummaryFromOpenAI(string $text): ?string
    {
        $apiKey = env('OPENAI_API_KEY');

        if (!$apiKey) {
            Log::error("[OpenAISummarizer] OpenAI API Key is not configured in .env (OPENAI_API_KEY).");
            throw new \Exception('OpenAI API Key is not configured.');
        }

        try {
            $client = OpenAI::client($apiKey);

            // Consider making the model and prompt details configurable
            $model = 'gpt-3.5-turbo'; // Or 'gpt-4', 'gpt-4o', etc.
            $prompt = "Summarize the following Amplitude technical documentation in no more than 100 words. Use direct, active voice, present tense, and simple, direct language. Avoid instructions. Frame the response directly to the reader. Use the word 'you' instead of 'users'. Write for both human readers and search engines by including the most important keywords and a clear description of the content's purpose. The full text is:\n\n\"" . mb_strimwidth($text, 0, 15000, "...") . "\"\n\nSummary:"; // Truncate input if too long for the model's context window

            Log::info("[OpenAISummarizer] Sending text to OpenAI (model: {$model}). Text length: " . strlen($text));

            $response = $client->chat()->create([
                'model' => $model,
                'messages' => [
                    ['role' => 'system', 'content' => "Respond in direct, simple communication. Use contractions wherever possible. Use the present tense. Frame the response around the user and what they can do with functionality. Don't provide instructions, just summarize the content of the article, and what it enables for them. Avoid weasel words like utilize."],
                    ['role' => 'user', 'content' => $prompt],
                ],
                'max_tokens' => 150,  // Adjust based on desired summary length
                'temperature' => 0.6, // Lower for more factual, higher for more creative
            ]);

            $summary = $response->choices[0]->message->content;

            if ($summary) {
                Log::info("[OpenAISummarizer] Summary received from OpenAI: " . substr(trim($summary), 0, 100) . "...");
                return trim($summary);
            } else {
                Log::warning("[OpenAISummarizer] OpenAI API returned an empty summary for text (snippet): " . substr($text, 0, 100) . "...");
                return null;
            }

        } catch (OpenAIErrorException $e) {
            Log::error("[OpenAISummarizer] OpenAI API Error: " . $e->getMessage() . " (Type: " . $e->type() . ", Code: " . $e->code() . ")");
            throw new \Exception("OpenAI API Error: " . $e->getMessage());
        } catch (\Exception $e) {
            Log::error("[OpenAISummarizer] General error fetching summary from OpenAI: " . $e->getMessage());
            throw $e; // Re-throw general exceptions
        }
    }
}
