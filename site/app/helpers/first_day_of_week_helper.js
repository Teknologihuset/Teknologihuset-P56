Ember.Handlebars.registerBoundHelper('week-time-period', function(property) {
    if (property !== null && property.get('week') && property.get('year')) {
        var week = property.get('week');
        var year = property.get('year');

        console.log(week + " : " + year);
        if (year === null) {
            year = (new Date()).getFullYear();
        }

        var date = new Date();
        date.setYear(year);
        date.setDate(1);
        date.setMonth(0);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);

        // 0 correspond au dimanche et 6 correspond au samedi.
        var FIRST_DAY_OF_WEEK = 1; // Monday, according to iso8601
        var WEEK_LENGTH = 7; // 7 days per week
        var day = date.getDay();
        day = (day === 0) ? 7 : day; // make the days monday-sunday equals to 1-7 instead of 0-6
        var dayOffset=-day+FIRST_DAY_OF_WEEK; // dayOffset will correct the date in order to get a Monday
        if (WEEK_LENGTH-day+1<4) {
            // the current week has not the minimum 4 days required by iso 8601 => add one week
            dayOffset += WEEK_LENGTH;
        }
        date = new Date(date.getTime()+dayOffset*24*60*60*1000);

        var weekTime   = 1000 * 60 * 60 * 24 * 7 * (week - 1);
        var targetTime = date.getTime() + weekTime;

        date.setTime(targetTime);

        var toDate = new Date(date.getTime() + (1000 * 60 * 60 * 24 * 7));

        return date.getDate() + "/" + (date.getMonth() + 1) + " - " + toDate.getDate() + "/" + (toDate.getMonth() + 1);
    }
});

