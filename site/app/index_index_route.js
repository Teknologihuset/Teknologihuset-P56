Teknologihuset.IndexIndexRoute = Ember.Route.extend({
    model: function() {
        return Ember.RSVP.hash({
            forside: this.store.find('page', 'forside'),
            kontakt: this.store.find('page', 'kontakt')
        });
    }
});