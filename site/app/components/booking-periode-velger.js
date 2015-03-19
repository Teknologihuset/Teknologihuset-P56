Teknologihuset.BookingPeriodeVelgerComponent = Ember.Component.extend(Teknologihuset.AnimateInViewMixin, {
    elementId: 'bookingLengdeVelger',

    periodeValgt: false,

    isHeldags: false,
    isHalvdags: false,
    isTimer: false,

    actions: {
        velgHeldags: function() {
            this.set('isHeldags', true);
            this.set('isHalvdags', false);
            this.set('isTimer', false);
            this.set('bookingType', 'hele dag');
            this.set('periodeValgt', true);
        },

        velgHalvdags: function() {
            this.set('isHeldags', false);
            this.set('isHalvdags', true);
            this.set('isTimer', false);
            this.set('bookingType', 'halve dag');
            this.set('periodeValgt', true);
        },

        velgTimer: function() {
            this.set('isHeldags', false);
            this.set('isHalvdags', false);
            this.set('isTimer', true);
            this.set('bookingType', 'time');
            this.set('periodeValgt', true);
        }
    },

    bookingTypeObserver: function() {
        console.log('bookingTypeObserver: ' + this.get('bookingType'));

        if (this.get('bookingType') === 'hele dag') {
            this.set('isHeldags', true);
            this.set('isHalvdags', false);
            this.set('isTimer', false);
        } else if (this.get('bookingType') === 'halve dag') {
            this.set('isHeldags', false);
            this.set('isHalvdags', true);
            this.set('isTimer', false);
        } else if (this.get('bookingType') === 'time') {
            this.set('isHeldags', false);
            this.set('isHalvdags', false);
            this.set('isTimer', true);
        }
    }.observes('bookingType').on('init'),

    periodeObserver: function() {
        if (this.get('periodeValgt') === true && this.get('animateSelection')) {
            var self = this;
            /*Ember.run.scheduleOnce('afterRender', function() {
                Ember.$("#" + self.get('elementId')).animate({ 'marginTop': '0px', opacity: 0.5 }, 500, function() {
                    Ember.$("#" + self.get('elementId') + " h1").animate({ 'marginBottom': '10px', opacity: 0.5 }, 500);
                });
            });*/
        }
    }.observes('periodeValgt').on('init')
});