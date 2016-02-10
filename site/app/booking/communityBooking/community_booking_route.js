Teknologihuset.CommunityBookingRoute = Ember.Route.extend({
    model: function() {
        return Ember.RSVP.hash({
            betingelser: this.store.find('page', 'betingelser')
        });
    }
});