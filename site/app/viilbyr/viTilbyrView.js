Teknologihuset.ViTilbyrView = Ember.View.extend(Teknologihuset.AnimateInViewMixin, {
    didInsertElement: function() {
        this._super();

        //Pre-load images for a smoother experience
        (new Image()).src = '/uploads/plantegning_blikkfang.png';
        (new Image()).src = '/uploads/plantegning_fyrtarnet.png';
        (new Image()).src = '/uploads/plantegning_innsikt.png';
        (new Image()).src = '/uploads/plantegning_inspirasjon.png';
        (new Image()).src = '/uploads/plantegning_lysningen.png';
        (new Image()).src = '/uploads/plantegning_spillrommet.png';
    }
});