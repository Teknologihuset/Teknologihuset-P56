Teknologihuset.ViTilbyr3rdFloorInspirasjonRoute = Ember.Route.extend({
    model: function() {
        console.log("TESTING");
        return this.store.find('room', 'Big Conference Room');
    }
});