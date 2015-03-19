Teknologihuset.BookingIndexController = Ember.ArrayController.extend({
    needs: ['booking'],

    sortProperties: ["sorteringsIndex"],
    sortAscending: true,

    antallDeltakereValgt: false,
    formalitetValgt: false,
    periodeValgt: false,

    filterValgt: function() {
        return this.get('periodeValgt') && this.get('antallDeltakereValgt');
    }.property('antallDeltakereValgt', 'periodeValgt'),

    currentWeek: function() {
        return Teknologihuset.currentWeek();
    }.property()/*,

    selectedValuesObserver: function() {
        console.log('periodeValgt: ' + this.get('periodeValgt'));
        console.log('bookingType: ' + this.get('bookingType'));

        if (this.get('antallDeltakereValgt') === true && this.get('deltakere') !== undefined) {
            this.set('controllers.booking.deltakere', this.get('deltakere'));
        }

        if (this.get('formalitetValgt') === true && this.get('formelt') !== undefined) {
            this.set('controllers.booking.formelt', this.get('formelt'));
        }

        if (this.get('periodeValgt') === true && this.get('bookingType') !== undefined) {
            this.set('controllers.booking.bookingType', this.get('bookingType'));
        }

        if (this.get('antallDeltakereValgt') === true &&
            this.get('periodeValgt') === true) {


            var currDay = Teknologihuset.currentDay();
            var self = this;

            console.log("REDIRECTING TO BOOKING DAY: " + currDay);
            this.transitionToRoute('booking.week');

            Ember.run.scheduleOnce('afterRender', function() {
                //console.log("REDIRECTING TO BOOKING DAY");
                //self.transitionToRoute('booking.day', currDay);
            });
        }
    }.observes('antallDeltakereValgt', 'formalitetValgt', 'periodeValgt', 'mangeDeltakere', 'isFormelt', 'isHeldags', 'isHalvdags', 'isTimer').on('init'),

    queryParamsObserver: function() {
        console.log('queryParamsObserver: ' + this.get('controllers.booking.mangeDeltakere'));

        if (this.get('controllers.booking.deltakere') !== undefined) {
            this.set('antallDeltakereValgt', true);
        }

        if (this.get('controllers.booking.formelt') !== undefined) {
            this.set('formalitetValgt', true);
        }

        if (this.get('controllers.booking.bookingType') !== undefined) {
            this.set('periodeValgt', true);
        }
    }.observes('controllers.booking.deltakere', 'controllers.booking.formelt', 'controllers.booking.bookingType').on('init')
    */
});