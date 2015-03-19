Teknologihuset.PartnereRoute = Ember.Route.extend({
    model: function() {
        return Ember.RSVP.hash({
            partnere: this.store.find('page', 'partners'),
            bliPartner: this.store.find('page', 'bliPartner'),
            partners: this.store.find('partner'),
            quotes: this.store.find('quote')
        });
    }
});