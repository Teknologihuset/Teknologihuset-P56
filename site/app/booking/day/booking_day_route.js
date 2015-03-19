Teknologihuset.BookingDayRoute = Ember.Route.extend({
    model: function(param) {
        console.log(param);
        var currDay = param.day_id;
        if (!currDay || currDay === null) {
            currDay = Teknologihuset.firstBookingDay();
        }

        console.log('currDay: ' + currDay);
        //return this.store.find('week', weeknum);

        return Ember.RSVP.hash({
            day: currDay,
            roomDays: this.store.find('roomDay', {date: currDay}),
            rooms: this.store.find('room')
        });
    }
});