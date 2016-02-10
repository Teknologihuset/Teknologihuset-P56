Teknologihuset.ViTilbyrController = Ember.ObjectController.extend({
    needs: ['application'],

    selectedValuesObserver: function() {
        if (this.get('controllers.application.currentPath') === 'index.viTilbyr.2ndFloor.index') {
            this.transitionToRoute('viTilbyr.2ndFloor.lysningen');
        }

        if (this.get('controllers.application.currentPath') === 'index.viTilbyr.3rdFloor.index') {
            this.transitionToRoute('viTilbyr.3rdFloor.inspirasjon');
        }
    }.observes('controllers.application.currentPath').on('init')
});