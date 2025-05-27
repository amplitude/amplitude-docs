import Fieldtype from './components/fieldtypes/ArticleSummary.vue';
 
Statamic.booting(() => {
    // Should be named [snake_case_handle]-fieldtype
    Statamic.$components.register('article_summary-fieldtype', Fieldtype);
});