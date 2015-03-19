Teknologihuset.ViTilbyr3rdFloorRoute = Ember.Route.extend({
    beforeModel: function() {
        this.transitionTo('viTilbyr.3rdFloor.inspirasjon');
    }
});