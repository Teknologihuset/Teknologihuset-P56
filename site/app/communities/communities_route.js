Teknologihuset.CommunityRoute = Ember.Route.extend({
    model: function() {
        return Ember.RSVP.hash({
            page: this.store.find('page', 'community'),
            communityKriterier: this.store.find('page', 'communityKriterier'),
            communityUtenLogo: this.store.find('page', 'communityUtenLogo'),
            communities: this.store.find('community'),
            quotes: this.store.find('quote')
        });
    }
});