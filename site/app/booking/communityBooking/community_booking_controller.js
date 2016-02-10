Teknologihuset.CommunityBookingController = Ember.Controller.extend({
    needs: ['application', 'communityBookingDay'],
    queryParams: ['deltakere'],


    showBookingValg: function() {
        return this.get('controllers.application.currentPath').indexOf('index.communityBooking.foresporsel') === -1;
    }.property('controllers.application.currentPath'),

    antallDeltakereValgt: false,

    filterValgt: function() {
        return this.get('antallDeltakereValgt');
    }.property('antallDeltakereValgt'),

    generateQueryParams: function() {
        return {queryParams: {"deltakere": this.get('deltakere')}};
    },

    queryParamsObserver: function() {
        console.log('queryParamsObserver: ' + this.get('mangeDeltakere'));

        if (this.get('deltakere') !== undefined) {
            this.set('antallDeltakereValgt', true);
        }
    }.observes('deltakere').on('init'),

    selectedValuesObserver: function() {
        if (this.get('controllers.application.currentPath') === 'index.communityBooking.day' || this.get('controllers.application.currentPath') === 'index.communityBooking.index') {
            this.doSelectedValuesObserver();
        }
    }.observes('controllers.application.currentPath', 'antallDeltakereValgt', 'controllers.communityBookingDay.roomDay').on('init'),

    doSelectedValuesObserver: function() {
        console.log('antallDeltakereValgt: ' + this.get('antallDeltakereValgt'));

        if (this.get('antallDeltakereValgt')) {

            var currDay = this.get('controllers.communityBookingDay.day');

            //if day is selected, use it
            if (!currDay) {
                //Otherwise, redirect to today
                currDay = Teknologihuset.firstBookingDay();
            }

            var self = this;

            console.log("REDIRECTING TO COMMUNITY BOOKING DAY: " + currDay);
            this.transitionToRoute('communityBooking.day', currDay, this.generateQueryParams());

            Ember.run.scheduleOnce('afterRender', function() {
                //console.log("REDIRECTING TO BOOKING DAY");
                //self.transitionToRoute('booking.day', currDay);
            });
        }
    }
});