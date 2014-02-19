Teknologihuset.RoomWeek = DS.Model.extend({
    roomWeek: DS.attr('number'),
    roomYear: DS.attr('number'),
    roomMonth: DS.attr('number'),
    roomDays: DS.hasMany('roomDay'),
    room: DS.belongsTo('room')
});