Teknologihuset.CommunityBookingDayController = Ember.ObjectController.extend({
    needs: ['communityBooking'],

    actions: {
        toogleRoomEvent: function(params) {
            var roomDay = params.roomDay;
            var event = params.roomEvent;
            event.set('selected', true);
            console.log("Forwarding to booking confirmation: " + event);
            this.set('controllers.communityBooking.selectedEvent', event);

            //
            Ember.run.later(function() {
                event.set('selected', false);
            });
            this.transitionToRoute('communityBooking.foresporsel');

        },

        showCalendar: function() {
            console.log('showing calendar');
            this.toggleProperty('showCalendar');
        },

        daySelected: function(param) {
            this.set('showCalendar', false);
            this.transitionToRoute('communityBooking.day', param);
        }
    },

    matchedRooms: function() {
        var allRooms = this.get('roomDays');
        var matchedRooms = [];
        var self = this;

        if (allRooms) {
            matchedRooms = allRooms.filter(function(item, index, enumerable) {
                if(self.get('controllers.communityBooking.deltakere') === 'mange' && item.get('room.kapasitet') >= 15){
                    return true;
                } else if (self.get('controllers.communityBooking.deltakere') === 'faa' && item.get('room.kapasitet') < 15) {
                    return true;
                }

                return false;
            });

        }

        return matchedRooms;
    }.property('controllers.communityBooking.deltakere', 'roomDays.@each.rooms'),

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
        var now= moment();

        var thisWeek = now.week();
        var bookingWeek = day.week();

        var diff = bookingWeek - thisWeek;

        return diff < 1;
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