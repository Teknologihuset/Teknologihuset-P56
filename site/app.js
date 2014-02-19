Date.prototype.getWeek = function() {
    var onejan = new Date(this.getFullYear(),0,2);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
};

var Teknologihuset = Ember.Application.create({
    currentWeek: function() {
        var now = new Date();
        var weekNumber = now.getWeek();
        var year = now.getFullYear();

        return year + ";" + weekNumber;
    }

});