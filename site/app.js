Date.prototype.getWeek = function() {
    var onejan = new Date(this.getFullYear(),0,2);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
};

moment.locale('nb');

var Teknologihuset = Ember.Application.create({
    currentWeek: function() {
        var now = new Date();
        var weekNumber = now.getWeek();
        var year = now.getFullYear();

        return year + ";" + weekNumber;
    },

    currentDay: function() {
        var rightNow = new Date();
        var res = rightNow.toISOString().slice(0,10);
        return res;
    },

    firstBookingDay: function() {
        var rightNow = moment().add(2, "days");

        while (rightNow.isoWeekday() == 6 || rightNow.isoWeekday() == 7) {
            rightNow.add(1, 'days');
        }

        var res = rightNow.format("YYYY-MM-DD");
        return res;
    }
});