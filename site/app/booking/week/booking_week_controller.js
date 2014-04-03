Teknologihuset.BookingWeekController = Ember.ObjectController.extend({
    needs: ['booking'],
    selectedHours: [],
    selectedHourGroups: [],
    bookingType: 'time',
    bookingTypes: ['time', 'halve dag', 'hele dag'],
    showCalendar: false,

    actions: {
        showCalendar: function() {
            console.log('showing calendar');
            this.toggleProperty('showCalendar');
        },

        selectHour: function(event) {
            event.set('selected', !event.get('selected'));


            var hourIsAlreadySelected = false;

            this.get('selectedHours').forEach(function(hour) {
                if (hour.get('id') === event.get('id')) {
                    hourIsAlreadySelected = true;
                }
            });

            if (hourIsAlreadySelected) {
                event.set('selected', false);
                this.get('selectedHours').removeObject(event);
            } else {
                this.get('selectedHours').pushObject(event);
            }
        },

        removeHour: function(hour) {
            hour.set('selected', false);
            this.get('selectedHours').removeObject(hour);
        },

        decrementWeek: function() {
            var weekNumber = this.get('weeknum') - 1;
            var yearNumber = this.get('year');

            if (weekNumber < 1) {
                weekNumber = 52;
                yearNumber = yearNumber - 1;
            }
            week = {
                week_id: yearNumber + ";" + weekNumber
            };

            console.log(week);

            this.set('showCalendar', false);
            this.transitionToRoute('booking.week', this.store.find('week', week.week_id));
        },

        incrementWeek: function() {
            var weekNumber = this.get('weeknum') + 1;
            var yearNumber = this.get('year');

            if (weekNumber > 52) {
                weekNumber = 1;
                yearNumber = yearNumber + 1;
            }

            week = {
                week_id: yearNumber + ";" + weekNumber
            };

            console.log(week);

            this.set('showCalendar', false);
            this.transitionToRoute('booking.week', this.store.find('week', week.week_id));
        },

        velgUke: function(week) {
            this.set('showCalendar', false);

            var weekNumber = week.get('week');
            var yearNumber = week.get('year');

            var weekId = yearNumber + ";" + weekNumber;

            this.transitionToRoute('booking.week', this.store.find('week', weekId));
        },

        selectHalfdayEvent: function(event) {
            console.log('selecting half day event: ');
            console.log(event);
            event.toggleProperty('selected');

            if (event.get('selected')) {
                this.get('selectedHours').pushObject(event);
            } else {
                this.get('selectedHours').removeObject(event);
            }

        },

        selectFulldayEvent: function(event) {
            console.log('selecting full day event: ');
            console.log(event);
            event.toggleProperty('selected');

            if (event.get('selected')) {
                this.get('selectedHours').pushObject(event);
            } else {
                this.get('selectedHours').removeObject(event);
            }
        }
    },



    totalBookingPris: function() {
        var totalPris = 0;

        var isBookingHours = this.get('isBookingHours');
        var isBookingHalfday = this.get('isBookingHalfday');
        var isBookingFullday = this.get('isBookingFullday');

        this.get('selectedHours').forEach(function(hour) {
            if (isBookingHours && hour.get('room.pris')) {
                totalPris = totalPris + hour.get('room.pris');
            } else if (isBookingHalfday && hour.get('room.halvdagspris')) {
                totalPris = totalPris + hour.get('room.halvdagspris');
            } else if (isBookingFullday && hour.get('room.heldagspris')) {
                totalPris = totalPris + hour.get('room.heldagspris');
            }
        });

        return totalPris;
    }.property('selectedHours.length', 'selectedHours.@each.room.pris'),

    bookingTypeObserver: function() {
        console.log('resetting selection');
            /*this.get('selectedHours').forEach(function(hour) {
                hour.set('selected', false);
            });*/

        //this.set('selectedHours', []);

        if (this.get('isBookingHours')) {

        } else if (this.get('isBookingHalfday')) {

        } else if (this.get('isBookingFullday')) {

        }
    }.observes('bookingType'),

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