Teknologihuset.RoomDay = DS.Model.extend({
    dayOfWeek: DS.attr('number'),
    roomWeek: DS.attr('number'),
    roomYear: DS.attr('number'),
    roomMonth: DS.attr('number'),
    dayOfMonth: DS.attr('number'),
    room: DS.belongsTo('room', {async: true}),
    roomEvents: DS.hasMany('roomEvent'),
    halfdayEvents: DS.hasMany('roomEvent'),
    fulldayEvent: DS.belongsTo('roomEvent'),

    dayLetter: function() {
        if (this.get('dayOfWeek') === 1) {
            return "M";
        } else if (this.get('dayOfWeek') === 2) {
            return "T";
        } else if (this.get('dayOfWeek') === 3) {
            return "O";
        } else if (this.get('dayOfWeek') === 4) {
            return "T";
        } else if (this.get('dayOfWeek') === 5) {
            return "F";
        } else if (this.get('dayOfWeek') === 6) {
            return "L";
        } else if (this.get('dayOfWeek') === 7) {
            return "S";
        }
    }.property('dayOfWeek'),

    delvisOpptatt: function() {
        return this.get('roomEvents').anyBy('opptatt', true);
    }.property('roomEvents.@each.googleCalId'),

    opptatt: function() {
        return this.get('roomEvents').everyBy('opptatt', true);
    }.property('roomEvents.@each.googleCalId'),

    ledig: function() {
        return this.get('roomEvents').anyBy('ledig', true);
    }.property('roomEvents.@each.googleCalId'),

    anyEventsSelected: function() {
        var selected = false;

        this.get('roomEvents').forEach(function(event) {
            if (event.get('selected')) {
                selected = true;
            }
        });

        return selected;
    }.property('roomEvents.@each.selected'),

    anyHalfdayEventsSelected: function() {
        var selected = false;

        this.get('halfdayEvents').forEach(function(event) {
            if (event.get('selected')) {
                selected = true;
            }
        });

        return selected;
    }.property('halfdayEvents.@each.selected'),

    fulldayEventSelected: function() {
        var selected = false;

        if (this.get('fulldayEvent.selected')) {
            selected = true;
        }

        return selected;
    }.property('fulldayEvent.@each.selected')
});