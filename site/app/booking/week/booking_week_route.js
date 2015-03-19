Teknologihuset.BookingWeekRoute = Ember.Route.extend({
    model: function(week) {
        console.log(week);
        var weeknum = week.week_id;
        if (!weeknum || weeknum === null) {
            weeknum = Teknologihuset.currentWeek();
        }

        console.log('weeknum: ' + weeknum);
        return this.store.find('week', weeknum);
    }
});