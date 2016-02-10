Teknologihuset.BookingRoute = Ember.Route.extend({
    setupController: function(controller) {
        this._super(controller);
        console.log('BookingRoute: setupController: '+ controller);
        controller.set('setupCalled', false);

        Ember.run.later(function() {
            controller.set('setupCalled', true);
        });

        this.store.find('page', 'betingelser').then(function(data) {
            controller.set('betingelser', data);
        });
    }
});