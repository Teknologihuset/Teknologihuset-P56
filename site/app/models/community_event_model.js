Teknologihuset.CommunityEvent = DS.Model.extend({
    googleCalId: DS.attr('string'),
    name: DS.attr('string'),
    start: DS.attr('date'),
    end: DS.attr('date'),
    description: DS.attr('string'),
    hour: DS.attr('number'),
    endHour: DS.attr('number'),

    selected: false,
    bookingPrice: null,

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

    formattedFromHour: function() {
        return ('0' + this.get('hour')).slice(-2);
    }.property('hour'),

    formattedToHour: function() {
        return ('0' + this.get('endHour')).slice(-2);
    }.property('endHour')
});