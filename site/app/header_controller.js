Teknologihuset.HeaderController = Ember.ArrayController.extend({
    needs: ['index'],

    currentWeek: function() {
        return Teknologihuset.currentWeek();
    }.property('Teknologihuset.currentWeek')
});