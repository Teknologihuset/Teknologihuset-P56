Teknologihuset.ViTilbyr3rdFloorInnsiktRoute = Ember.Route.extend({
    model: function() {
        console.log("TESTING");
        return this.store.find('room', 'Small Conference Room');
    }
});