Teknologihuset.ViTilbyrRoute = Ember.Route.extend({
    model: function() {
        return Ember.RSVP.hash({
            viTilbyr: this.store.find('page', 'viTilbyr')
        });
    }
});