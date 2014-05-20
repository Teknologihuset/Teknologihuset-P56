Teknologihuset.LiviconView = Ember.View.extend({
    tagName: 'i',
    attributeBindings: ["data-name", "data-color", "data-size", "data-hovercolor"],

    didInsertElement: function() {
        //$("#" + this.get('elementId')).addLivicon();
    }
});