Teknologihuset.BookingRoute = Ember.Route.extend({
    redirect: function() {
        console.log('BookingRoute: redirect');
    },

    model: function() {
        console.log('BookingRoute: model');
        return this.store.find('room');
    },

    afterModel: function() {
        console.log('BookingRoute: afterModel');
    },

    setupController: function(controller) {
        console.log('BookingRoute: setupController: '+ controller);
        controller.set('setupCalled', true);
    }
});