Teknologihuset.BookingWeekController = Ember.ObjectController.extend({
    needs: ['booking'],
    selectedHours: [],
    selectedHourGroups: [],
    bookingType: 'time',
    prevBookingType: 'time',
    bookingTypes: ['time', 'halve dag', 'hele dag'],
    showCalendar: false,

    actions: {
        showCalendar: function() {
            console.log('showing calendar');
            this.toggleProperty('showCalendar');
        },

        selectEvent: function(event) {
            var alreadySelectedEvent = this.eventAlreadySelected(event);

            if (alreadySelectedEvent && !event.get('selected')) {
                alert('Du har allerede booket et møte fra ' + alreadySelectedEvent.get('hour') + " til " + alreadySelectedEvent.get('endHour'));
            } else {
                event.toggleProperty('selected');

                if (event.get('selected')) {
                    var bookingPris = event.get('room.pris');
                    if (this.get('isBookingHalfday')) {
                        bookingPris = event.get('room.halvdagspris');
                    } else if (this.get('isBookingFullday')) {
                        bookingPris = event.get('room.heldagspris');
                    }

                    event.set('bookingPrice', bookingPris);
                    this.get('selectedHours').pushObject(event);
                } else {
                    event.set('bookingPrice', null);
                    this.get('selectedHours').removeObject(event);
                }
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

        weekSelected: function(week) {
            console.log('weelSelected: ' + week);
            this.set('showCalendar');
            this.transitionToRoute('booking.week', this.store.find('week', week));
        },

        velgUke: function(week) {
            this.set('showCalendar', false);

            var weekNumber = week.get('week');
            var yearNumber = week.get('year');

            var weekId = yearNumber + ";" + weekNumber;

            this.transitionToRoute('booking.week', this.store.find('week', weekId));
        }
    },

    eventAlreadySelected: function(event) {
        var selectedHours = this.get('selectedHours');
        var idIsAlreadySelected = false;

        var alreadySelectedEvent = null;

        selectedHours.forEach(function(hour) {
            var hourStartOfId = hour.get('id').substring(0,hour.get('id').lastIndexOf(";"));
            var eventStartOfId = event.get('id').substring(0,event.get('id').lastIndexOf(";"));

            if (hourStartOfId === eventStartOfId) {
                var bookedStart = hour.get('hour');
                var bookedEnd = hour.get('endHour');

                var eventStart = event.get('hour');
                var eventEnd = event.get('endHour');

                console.log('bookedStart: ' + bookedStart + " bookedEnd: " + bookedEnd);
                console.log('eventStart: ' + eventStart + " eventEnd: " + eventEnd);

                if ((eventStart >= bookedStart && eventEnd <= bookedEnd) || 
                    (eventStart <= bookedStart && eventEnd >= bookedEnd)) {
                    idIsAlreadySelected = true;

                    alreadySelectedEvent = hour;
                }
            }
        });

        return alreadySelectedEvent;
    },

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

    bookingTypeObserver: function() {
        /*if (this.get('prevBookingType') !== this.get('bookingType') && this.get('selectedHours.length') > 0) {
            var r=confirm("Du har allerede valgt møtetidspunkt. Dersom du endrer til booking pr " + this.get('bookingType') + ' vil dine eksisterende valg fjernes.');

            if (r) {
                this.resetBookings();
                this.set('prevBookingType', this.get('bookingType'));
            } else {
               this.set('bookingType', this.get('prevBookingType'));
            }
        } else {
            this.set('prevBookingType', this.get('bookingType'));
        }

        if (this.get('isBookingHours')) {

        } else if (this.get('isBookingHalfday')) {

        } else if (this.get('isBookingFullday')) {

        }*/
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