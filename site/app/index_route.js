Teknologihuset.IndexRoute = Ember.Route.extend({
    model: function() {
        return this.store.find('page');
    },

    setupController: function(controller, model) {
        var toppPages = [];

        model.forEach(function(page) {
            if (page.get('forsidePlassering') === 'topp') {
                controller.set('toppArtikkel', page);
            }

            if (page.get('forsidePlassering') === 'venstre') {
                controller.set('venstreArtikkel', page);
            }

            if (page.get('forsidePlassering') === 'hoyre') {
                controller.set('hoyreArtikkel', page);
            }

            if (page.get('toppmeny')) {
                toppPages.pushObject(page);
            }
        });

        var sortedPages = Em.ArrayProxy.createWithMixins(
            Ember.SortableMixin,
            { content:toppPages, sortProperties: ['toppIndex'] }
        );

        controller.set('toppmenySider', sortedPages);
    }
});