<template>

        <div class="flex flex-col justify-end h-full bg-white dark:bg-dark-800">

            <div class="flex-1 overflow-scroll">
                <asset-browser
                    :initial-container="container"
                    :initial-per-page="$config.get('paginationSize')"
                    :selected-path="folder"
                    :selected-assets="browserSelections"
                    :restrict-folder-navigation="restrictFolderNavigation"
                    :max-files="maxFiles"
                    :query-scopes="queryScopes"
                    :autoselect-uploads="true"
                    :autofocus-search="true"
                    allow-selecting-existing-upload
                    @selections-updated="selectionsUpdated"
                    @asset-doubleclicked="select"
                >

                    <template slot="contextual-actions" v-if="browserSelections.length">
                        <button class="btn action mb-6" @click="browserSelections = []">{{ __('Uncheck All') }}</button>
                    </template>

                </asset-browser>
            </div>

            <div class="p-4 border-t dark:border-dark-200 flex items-center justify-between bg-gray-200 dark:bg-dark-500">
                <div class="text-sm text-gray-700"
                    v-text="hasMaxFiles
                        ? __n(':count/:max selected', browserSelections, { max: maxFiles })
                        : __n(':count selected|:count selected', browserSelections)">
                </div>
                <div>
                    <button
                        type="button"
                        class="btn"
                        @click="close">
                        {{ __('Cancel') }}
                    </button>

                    <button
                        type="button"
                        class="btn-primary rtl:mr-2 ltr:ml-2"
                        @click="select">
                        {{ __('Select') }}
                    </button>
                </div>
            </div>

        </div>

</template>

<script>
export default {
    props: {
        container: String,
        folder: String,
        selected: Array,
        maxFiles: Number,
        queryScopes: Array,
        restrictFolderNavigation: {
            type: Boolean,
            default() {
                return false;
            }
        }
    },


    data() {
        return {
            // We will initialize the browser component with the selections, but not pass in the selections directly.
            // We only want selection changes to be reflected in the fieldtype once the user is ready to commit
            // them. They should be able to cancel at any time and have their updated selections discarded.
            browserSelections: this.selected
        }
    },

    computed: {

        hasMaxFiles() {
            return (this.maxFiles === Infinity) ? false : Boolean(this.maxFiles);
        }

    },

    watch: {

        browserSelections(selections) {
            if (this.maxFiles === 1 && selections.length === 1) {
                this.select();
            }
        },

    },

    methods: {

        /**
         * Confirm the updated selections
         */
        select() {
            this.$emit('selected', this.browserSelections);
            this.close();
        },

        /**
         * Close this selector
         */
        close() {
            this.$emit('closed');
        },

        /**
         * Selections have been updated within the browser component.
         */
        selectionsUpdated(selections) {
            this.browserSelections = selections;
        }

    }

};
</script>
