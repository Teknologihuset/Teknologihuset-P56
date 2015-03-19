Teknologihuset.ViTlibyr2ndFloorView = Ember.View.extend(Teknologihuset.AnimateInViewMixin, {
    didInsertElement: function() {
        $('img[usemap]').rwdImageMaps();
    }
});