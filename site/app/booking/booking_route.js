Teknologihuset.BookingRoute = Ember.Route.extend({
    redirect: function() {
        console.log('BookingRoute: redirect');
        this.transitionTo('booking.week');
    },

    model: function() {
        console.log('BookingRoute: model');
        return this.store.find('room');
    },

    afterModel: function() {
        console.log('BookingRoute: afterModel');
        this.transitionTo('booking.week');
    },

    setupController: function() {
        console.log('BookingRoute: setupController');
        this.transitionTo('booking.week');
    }
});