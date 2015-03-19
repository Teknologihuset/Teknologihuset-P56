Teknologihuset.ViTilbyr2ndFloorRoute = Ember.Route.extend({
    beforeModel: function() {
        this.transitionTo('viTilbyr.2ndFloor.lysningen');
    }
});