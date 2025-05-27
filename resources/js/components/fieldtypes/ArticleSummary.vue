<template>
    <div class="flex flex-col space-y-2">
        <textarea-input
            ref="textarea"
            :name="name"
            :isReadOnly="isReadOnly"
            :value="value"
            :id="fieldId"
            rows="4"
            class="font-mono"
            @input="update"
            @focus="$emit('focus')"
            @blur="$emit('blur')"
        />
        
        <button 
            class="btn-primary" 
            @click="summarizeWithGPT"
            :disabled="!contentFieldValue || isLoading"
        >
            <template v-if="!isLoading">Summarize Content with ChatGPT</template>
            <template v-else>
                <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </template>
        </button>
    </div>
</template>

<script>
export default {
    mixins: [Fieldtype],

    inject: ['storeName'],

    data() {
        return {
            isLoading: false
        };
    },

    computed: {
        contentFieldValue() {
            const contentField = this.config.content_field || 'content';
            return this.$store.state.publish[this.storeName]?.values?.[contentField] || '';
        }
    },

    methods: {
        async summarizeWithGPT() {
            if (!this.contentFieldValue || this.isLoading) return;
            
            this.isLoading = true;
            
            try {
                const response = await fetch('https://api.openai.com/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer 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`
                    },
                    body: JSON.stringify({
                        model: 'gpt-3.5-turbo',
                        messages: [
                            {
                                role: 'system',
                                content: 'You are a helpful assistant that summarizes text in 100 words or less.'
                            },
                            {
                                role: 'user',
                                content: `Please summarize the following text in 100 words or less: ${this.contentFieldValue}`
                            }
                        ]
                    })
                });

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.error?.message || 'Failed to summarize text');
                }

                const data = await response.json();
                this.update(data.choices[0].message.content.trim());
            } catch (error) {
                console.error('Error summarizing text:', error);
                this.$notify.error(error.message || 'Failed to summarize text');
            } finally {
                this.isLoading = false;
            }
        }
    }
};
</script>
