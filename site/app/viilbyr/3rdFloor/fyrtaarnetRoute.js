Teknologihuset.ViTilbyr3rdFloorFyrtaarnetRoute = Ember.Route.extend({
    model: function() {
        console.log("TESTING");
        return this.store.find('room', 'BoardRoom');
    }
});