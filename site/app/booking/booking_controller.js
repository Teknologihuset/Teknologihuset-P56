Teknologihuset.BookingController = Ember.Controller.extend({
    needs: ['bookingDay', 'application'],
    queryParams: ['deltakere', 'bookingType'],
    setupCalled: false,

    antallDeltakereValgt: false,
    periodeValgt: false,

    selectedHours: [],

    filterValgt: function() {
        return this.get('periodeValgt') && this.get('antallDeltakereValgt');
    }.property('antallDeltakereValgt', 'periodeValgt'),

    generateQueryParams: function() {
        return {queryParams: {"deltakere": this.get('deltakere'), "bookingType": this.get('bookingType')}};
    },

    showBookingValg: function() {
        return this.get('controllers.application.currentPath').indexOf('index.booking.foresporsel') === -1;
    }.property('controllers.application.currentPath'),

    selectedValuesObserver: function() {
        console.log('antallDeltakereValgt: ' + this.get('antallDeltakereValgt'));
        console.log('periodeValgt: ' + this.get('periodeValgt'));
        console.log('controllers.bookingDay.roomDay: ' + this.get('controllers.bookingDay.roomDay'));

        if (this.get('setupCalled') === true) {
            this.set('setupCalled', false);
        }

        if (this.get('antallDeltakereValgt') === true &&
            this.get('periodeValgt') === true) {

            var currDay = this.get('controllers.bookingDay.day');

            //if day is selected, use it
            if (!currDay) {
                //Otherwise, redirect to today
                currDay = Teknologihuset.firstBookingDay();
            }

            var self = this;

            console.log("REDIRECTING TO BOOKING DAY: " + currDay);
            this.transitionToRoute('booking.day', currDay, this.generateQueryParams());

            Ember.run.scheduleOnce('afterRender', function() {
                //console.log("REDIRECTING TO BOOKING DAY");
                //self.transitionToRoute('booking.day', currDay);
            });
        }
    }.observes('antallDeltakereValgt', 'periodeValgt', 'deltakere', 'bookingType', 'controllers.bookingDay.roomDay', 'setupCalled').on('init'),

    queryParamsObserver: function() {
        console.log('queryParamsObserver: ' + this.get('mangeDeltakere'));

        if (this.get('deltakere') !== undefined) {
            this.set('antallDeltakereValgt', true);
        }

        if (this.get('formelt') !== undefined) {
            this.set('formalitetValgt', true);
        }

        if (this.get('bookingType') !== undefined) {
            this.set('periodeValgt', true);
        }
    }.observes('deltakere', 'formelt', 'bookingType').on('init'),

    resetBookings: function() {
        console.log('resetting selection');
        this.get('selectedHours').forEach(function(hour) {
            hour.set('selected', false);
        });

        this.set('selectedHours', []);
    },

    totalBookingPris: function() {
        var totalPris = 0;

        this.get('selectedHours').forEach(function(hour) {
            totalPris = totalPris + hour.get('bookingPrice');
        });

        return totalPris;
    }.property('selectedHours.length', 'selectedHours.@each.room.pris'),

    isBookingHours: function() {
        return this.get('bookingType') === 'time';
    }.property('bookingType'),

    isBookingHalfday: function() {
        return this.get('bookingType') === 'halve dag';
    }.property('bookingType'),

    isBookingFullday: function() {
        return this.get('bookingType') === 'hele dag';
    }.property('bookingType')
    
});