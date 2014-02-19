Teknologihuset.RoomBookingView = Ember.View.extend({
    actions: {
        selectRoom: function() {
            this.toggleProperty('roomIsSelected');
        },

        selectDay: function(day) {
            var previousSelectedDay = this.get('selectedDay');
            if (previousSelectedDay) {
                previousSelectedDay.set('selected', false);
            }

            day.set('selected', true);
            this.set('selectedDay', day);
        }
    },

    templateName: 'roomBooking',
    roomIsSelected: false,
    classNames: 'pointer, roomBooking'
});