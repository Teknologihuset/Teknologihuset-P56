Teknologihuset.ViTilbyr3rdFloorInspirasjonView = Ember.View.extend({
    didInsertElement: function() {
        Ember.run.schedule('afterRender', function() {
            $('map').imageMapResize();
        });
    }
});