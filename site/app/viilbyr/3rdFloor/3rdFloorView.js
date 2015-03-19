Teknologihuset.ViTlibyr3rdFloorView = Ember.View.extend(Teknologihuset.AnimateInViewMixin, {
    didInsertElement: function() {
        Ember.run.schedule('afterRender', function() {
            $('map').imageMapResize();
        });
    }
});