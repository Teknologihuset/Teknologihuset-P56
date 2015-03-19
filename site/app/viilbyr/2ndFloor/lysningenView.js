Teknologihuset.ViTilbyr2ndFloorLysningenView = Ember.View.extend({
    didInsertElement: function() {
        this._super();
        Ember.run.schedule('afterRender', function() {
            $('map').imageMapResize();
        });
    }
});