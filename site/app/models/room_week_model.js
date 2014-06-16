Teknologihuset.RoomWeek = DS.Model.extend({
    roomWeek: DS.attr('number'),
    roomYear: DS.attr('number'),
    roomMonth: DS.attr('number'),
    roomDays: DS.hasMany('roomDay'),
    room: DS.belongsTo('room'),

    weekdayRoomDays: function() {
        var weekdays = [];
        this.get('roomDays').forEach(function(roomDay) {
            if (roomDay.get('dayOfWeek') && roomDay.get('dayOfWeek') < 6 && roomDay.get('dayOfWeek') > 0) {
                weekdays.pushObject(roomDay);
            }
        });

        return weekdays;
    }.property('roomDays.@each.dayOfWeek'),

    isJuly: function() {
        return (this.get('roomMonth') === 7) || (this.get('roomMonth') === 6 && this.get('roomDays.lastObject.roomMonth') === 7);
    }.property('roomMonth', 'roomDays.length')
});