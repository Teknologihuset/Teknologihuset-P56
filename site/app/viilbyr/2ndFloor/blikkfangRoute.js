Teknologihuset.ViTilbyr2ndFloorBlikkfangRoute = Ember.Route.extend({
    model: function() {
        return this.store.find('room', 'RegularRoom');
    }
});