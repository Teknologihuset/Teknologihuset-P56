Teknologihuset.RoomEvent = DS.Model.extend({
    googleCalId: DS.attr('string'),
    name: DS.attr('string'),
    start: DS.attr('date'),
    end: DS.attr('date'),
    description: DS.attr('string'),
    hour: DS.attr('number'),
    endHour: DS.attr('number'),
    dayOfMonth: DS.attr('number'),
    month: DS.attr('number'),
    room: DS.belongsTo('room'),

    selected: false,

    fromHour: function() {
        if (this.get('start')) {
            return this.get('start').getHours();
        }
    }.property('start'),

    toHour: function() {
        if (this.get('end')) {
            return this.get('end').getHours();
        }
    }.property('end'),

    formattedHour: function() {
        return ('0' + this.get('hour')).slice(-2);
    }.property('hour'),

    opptatt: function() {
        return this.get('googleCalId') !== null;
    }.property('googleCalId'),

    ledig: function() {
        return this.get('googleCalId') === null;
    }.property('googleCalId')
});