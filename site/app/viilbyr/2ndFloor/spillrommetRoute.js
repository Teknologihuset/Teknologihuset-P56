Teknologihuset.ViTilbyr2ndFloorSpillrommetRoute = Ember.Route.extend({
    model: function() {
        return this.store.find('room', 'GameRoom');
    }
});