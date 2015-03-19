Teknologihuset.CommunityRoute = Ember.Route.extend({
    model: function() {
        return Ember.RSVP.hash({
            page: this.store.find('page', 'community'),
            communities: this.store.find('community'),
            quotes: this.store.find('quote')
        });
    }
});