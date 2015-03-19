Teknologihuset.ViTilbyr2ndFloorLysningenRoute = Ember.Route.extend({
    model: function() {
        console.log("TESTING");
        return this.store.find('room', 'GreenRoom');
    }
});