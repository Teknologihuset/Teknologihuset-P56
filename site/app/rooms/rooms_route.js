Teknologihuset.RoomsRoute = Ember.Route.extend({
    model: function() {
        return this.store.find('room');
    }
});