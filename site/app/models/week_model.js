Teknologihuset.Week = DS.Model.extend({
    weeknum: DS.attr('number'),
    year: DS.attr('number'),
    roomWeeks: DS.hasMany('roomWeek'),

    sortedRoomWeeks: function() {
        if (!this.get('isLoaded')) {
            return [];
        }

        var sorted = this.get('roomWeeks').toArray();
        return sorted.sort(function(lhs, rhs) {
            return lhs.get('room.sorteringsIndex') - rhs.get('room.sorteringsIndex');
        });

    }.property('roomWeeks.@each.room.sorteringsIndex'),

    thisWeek: function() {
        var now = new Date();
        var week = now.getWeek();
        var year = this.get('year');

        return Ember.Object.create({
            week: week,
            year: year
        });
    }.property('weeknum', 'year'),

    selectableWeeks: function() {
        var now = new Date();
        var week = now.getWeek() + 1;
        var year = this.get('year');

        var weeksToSelect = [];
        var endWeek = week + 10;
        for (var indexWeek = week; indexWeek <= endWeek; indexWeek++) {
            var date       = this.firstWeekOfYear(year),
                weekTime   = this.weeksToMilliseconds(week),
                targetTime = date.getTime() + weekTime;

            date.setTime(targetTime);

            weeksToSelect.pushObject(Ember.Object.create({
                week: indexWeek,
                year: year
            }));
        }


        /*if (endWeek > 52) {
            endWeek = endWeek - 52;
            year = year + 1;
        } else {
            var weeksToSelect = [];

            for (var indexWeek = week; indexWeek <= endWeek; indexWeek++) {
                var date       = this.firstWeekOfYear(year),
                    weekTime   = this.weeksToMilliseconds(week),
                    targetTime = date.getTime() + weekTime;

                date.setTime(targetTime);

            }
        }*/

        return weeksToSelect;

    }.property('weeknum', 'year'),

    firstDayOfWeek: function() {
        var week = this.get('weeknum');
        var year = this.get('year');

        if (year === null) {
            year = (new Date()).getFullYear();
        }

        var date       = this.firstWeekOfYear(year),
            weekTime   = this.weeksToMilliseconds(week),
            targetTime = date.getTime() + weekTime;

        date.setTime(targetTime);

        return date.getDate() + "/" + (date.getMonth() + 1);
    }.property('weeknum', 'year'),

    weeksToMilliseconds: function(weeks) {
        return 1000 * 60 * 60 * 24 * 7 * (weeks - 1);
    },

    lastDayOfWeek: function() {
        var week = this.get('weeknum');
        var year = this.get('year');

        if (year === null) {
            year = (new Date()).getFullYear();
        }

        var date       = this.firstWeekOfYear(year),
            weekTime   = this.weeksToMilliseconds(week) + (1000 * 60 * 60* 24 * 6),
            targetTime = date.getTime() + weekTime;

        date.setTime(targetTime);

        return date.getDate() + "/" + (date.getMonth() + 1);
    }.property('weeknum', 'year'),

    firstWeekOfYear: function (year) {
        var date = new Date();
        date = this.firstDayOfYear(date,year);
        date = this.firstWeekday(date);
        return date;
    },

    firstDayOfYear: function(date, year) {
        date.setYear(year);
        date.setDate(1);
        date.setMonth(0);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date;
    },

    firstWeekday: function(firstOfJanuaryDate) {
        // 0 correspond au dimanche et 6 correspond au samedi.
        var FIRST_DAY_OF_WEEK = 1; // Monday, according to iso8601
        var WEEK_LENGTH = 7; // 7 days per week
        var day = firstOfJanuaryDate.getDay();
        day = (day === 0) ? 7 : day; // make the days monday-sunday equals to 1-7 instead of 0-6
        var dayOffset=-day+FIRST_DAY_OF_WEEK; // dayOffset will correct the date in order to get a Monday
        if (WEEK_LENGTH-day+1<4) {
            // the current week has not the minimum 4 days required by iso 8601 => add one week
            dayOffset += WEEK_LENGTH;
        }
        return new Date(firstOfJanuaryDate.getTime()+dayOffset*24*60*60*1000);
    }
});