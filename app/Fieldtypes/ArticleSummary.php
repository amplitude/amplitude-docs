<?php

namespace App\Fieldtypes;

use Statamic\Fields\Fieldtype;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Statamic\Facades\CP\Toast;

class ArticleSummary extends Fieldtype
{
    protected $icon = 'text';

    protected static $handle = 'article_summary';

    /**
     * The blank/default value.
     *
     * @return array
     */
    public function defaultValue()
    {
        return null;
    }

    /**
     * Pre-process the data before it gets sent to the publish page.
     *
     * @param mixed $data
     * @return array|mixed
     */
    public function preProcess($data)
    {
        return $data;
    }

    /**
     * Process the data before it gets saved.
     *
     * @param mixed $data
     * @return array|mixed
     */
    public function process($data)
    {
        return $data;
    }

    /**
     * Generate a summary using OpenAI's API
     *
     * @param string $content
     * @return string
     */
    protected function summarize($content)
    {
        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . config('services.openai.api_key'),
                'Content-Type' => 'application/json',
            ])->post('https://api.openai.com/v1/chat/completions', [
                'model' => 'gpt-3.5-turbo',
                'messages' => [
                    [
                        'role' => 'system',
                        'content' => 'You are a helpful assistant that summarizes text in 100 words or less.'
                    ],
                    [
                        'role' => 'user',
                        'content' => 'Please summarize the following text in 100 words or less: ' . $content
                    ]
                ]
            ]);

            if (!$response->successful()) {
                Log::error('OpenAI API error', [
                    'status' => $response->status(),
                    'body' => $response->json()
                ]);
                throw new \Exception('Failed to generate summary: ' . ($response->json()['error']['message'] ?? 'Unknown error'));
            }

            return $response->json()['choices'][0]['message']['content'];
        } catch (\Exception $e) {
            Log::error('Error generating summary', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            throw $e;
        }
    }

    /**
     * Get the component name for the Fieldtype's Vue component
     */
    protected function configFieldItems(): array
    {
        return [
            'content_field' => [
                'display' => 'Content Field',
                'instructions' => 'Select the field that contains the content to summarize',
                'type' => 'text',
                'default' => 'content',
                'width' => 50
            ]
        ];
    }

    public function routes()
    {
        return [
            'summarize' => [
                'method' => 'post',
                'handler' => function () {
                    try {
                        $content = request()->input('content');
                        if (empty($content)) {
                            return response()->json(['error' => 'Content is required'], 422);
                        }

                        $summary = $this->summarize($content);
                        return ['summary' => $summary];
                    } catch (\Exception $e) {
                        return response()->json(['error' => $e->getMessage()], 500);
                    }
                }
            ]
        ];
    }
}
