Teknologihuset.HeaderView = Ember.View.extend({
    didInsertElement: function() {
        $("#mobile-menu-button").sidr();
        $().stellar();
    }
});