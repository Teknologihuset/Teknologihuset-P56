Teknologihuset.BookingDayController = Ember.ObjectController.extend({
    needs: ['booking'],

    showCalendar: false,
    showBetingelser: false,

    actions: {
        toogleRoomEvent: function(params) {
            var roomDay = params.roomDay;
            var event = params.roomEvent;

            console.log('Controller toggleEvent');

            var alreadySelectedEvent = this.eventAlreadySelected(event);

            if (alreadySelectedEvent && !event.get('selected')) {
                alert('Du har allerede booket et møte fra ' + alreadySelectedEvent.get('hour') + " til " + alreadySelectedEvent.get('endHour'));
            } else {
                event.toggleProperty('selected');

                if (event.get('selected')) {
                    event.set('start', roomDay.get('date'));
                    var bookingPris = event.get('room.pris');
                    if (this.get('controllers.booking.isBookingHalfday')) {
                        bookingPris = event.get('room.halvdagspris');
                    } else if (this.get('controllers.booking.isBookingFullday')) {
                        bookingPris = event.get('room.heldagspris');
                    }

                    event.set('bookingPrice', bookingPris);
                    this.get('controllers.booking.selectedHours').pushObject(event);
                } else {
                    event.set('bookingPrice', null);
                    this.get('controllers.booking.selectedHours').removeObject(event);
                }
            }
        },

        removeHour: function(hour) {
            hour.set('selected', false);
            this.get('controllers.booking.selectedHours').removeObject(hour);
        },

        showCalendar: function() {
            console.log('showing calendar');
            this.toggleProperty('showCalendar');
        },

        daySelected: function(param) {
            this.set('showCalendar', false);
            this.transitionToRoute('booking.day', param);
        },

        toggleBetingelser: function() {
            var self = this;
            if (this.get('showBetingelser')) {
                $("#bookingBetingelser").slideUp(function() {
                    self.set('showBetingelser', false);
                });
            } else {
                this.set('showBetingelser', true);
                Ember.run.schedule('afterRender', function() {
                    $("#bookingBetingelser").hide().slideDown();
                });
            }
        }
    },

    matchedRooms: function() {
        var allRooms = this.get('roomDays');
        var matchedRooms = [];
        var self = this;

        if (allRooms) {
            matchedRooms = allRooms.filter(function(item, index, enumerable) {
                if(self.get('controllers.booking.deltakere') === 'mange' && item.get('room.kapasitet') >= 20){
                    return true;
                } else if (self.get('controllers.booking.deltakere') === 'faa' && item.get('room.kapasitet') < 20) {
                    return true;
                }

                return false;
            });

        }

        return matchedRooms;
    }.property('controllers.booking.deltakere', 'roomDays.@each.rooms'),

    nonMatchRooms: function() {
        return [];
    }.property('controllers.booking.deltakere', 'rooms.@each.kapasitet'),

    eventAlreadySelected: function(event) {
        var selectedHours = this.get('controllers.booking.selectedHours');
        var idIsAlreadySelected = false;

        var alreadySelectedEvent = null;
        var controllerDay = this.get('model.day');

        selectedHours.forEach(function(hour) {
            var dateString = moment(hour.get('start')).format("YYYY-MM-DD");
            console.log('dateString:' + dateString + " controllerDay: " + controllerDay);
            if (dateString === controllerDay) {
                //Skip any bookings not made today

                var hourStartOfId = hour.get('id').substring(0, hour.get('id').lastIndexOf("-"));
                if (hour.get('id').indexOf(";") > -1) {
                    hourStartOfId = hour.get('id').substring(0, hour.get('id').lastIndexOf(";"));
                }
                var eventStartOfId = event.get('id').substring(0, event.get('id').lastIndexOf("-"));
                if (event.get('id').indexOf(";") > -1) {
                    eventStartOfId = event.get('id').substring(0, event.get('id').lastIndexOf(";"));
                }

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
            }
        });

        return alreadySelectedEvent;
    },

    dateObserver: function() {
        if (this.get('day')) {
            var prevDate = moment(this.get('day'));
            var nextDate = moment(this.get('day'));

            prevDate.add(-1, 'days');
            nextDate.add(1, 'days');

            while (nextDate.isoWeekday() == 6 || nextDate.isoWeekday() == 7) {
                nextDate.add(1, 'days');
            }

            while (prevDate.isoWeekday() == 6 || prevDate.isoWeekday() == 7) {
                prevDate.add(-1, 'days');
            }

            this.set('prevDate', prevDate.format('YYYY-MM-DD'));
            this.set('nextDate', nextDate.format('YYYY-MM-DD'));
        }
    }.observes('day').on('init'),

    isBookingWithinQuarantine: function() {
        var day = moment(this.get('day'));
        var in2Days= moment();

        var diff = Math.abs(in2Days.diff(day, 'hours'));

        return diff <= 24;
    }.property('day'),

    isBookingAllowed: function() {
        return (!this.get('isBookingWithinQuarantine')) && (!this.get('isBookingSummer')) && (!this.get('isBookingChristmas'));
    }.property('isBookingSummer', 'isBookingWithinQuarantine'),

    isBookingSummer: function() {
        var day = moment(this.get('day'));

        return (day.month() === 6 || day.add(3, "days").month() === 6);
    }.property('day'),

    isBookingChristmas: function() {
        var day = moment(this.get('day'));

        return (day.week() >= 51);
    }.property('day')
});