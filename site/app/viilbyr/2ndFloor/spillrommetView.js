Teknologihuset.ViTilbyr2ndFloorSpillrommetView = Ember.View.extend({
    didInsertElement: function() {
        this._super();
        Ember.run.schedule('afterRender', function() {
            $('map').imageMapResize();
        });
    }
});