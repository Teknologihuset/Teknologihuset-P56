Teknologihuset.RoomBookingDayView = Ember.View.extend({
    tagName: 'td',
    template: Ember.Handlebars.compile('{{roomDay.dayOfMonth}}<br />{{roomDay.dayLetter}}'),
    classNameBindings: ['opptatt', 'delvisOpptatt', 'selected', 'doubleSelected'],

    doubleSelected: function() {
        console.log('doubleSelected: ' + this.get('anyHourSelected') + " :: " + this.get('parentView.selectedDay.id') === this.get('roomDay.id'));
        return this.get('anyHourSelected') && this.get('parentView.selectedDay.id') === this.get('roomDay.id');
    }.property('roomDay.id', 'parentView.selectedDay.id', 'roomDay.selected', 'anyHourSelected'),

    anyHourSelected: function() {
        var selected = false;

        this.get('roomDay.roomEvents').forEach(function(event) {
            if (event.get('selected')) {
                selected = true;
            }
        });

        this.get('roomDay.halfdayEvents').forEach(function(event) {
            if (event.get('selected')) {
                selected = true;
            }
        });

        if (this.get('roomDay.fulldayEvent.selected')) {
            selected = true;
        }

        console.log('anyHourSelected: ' + selected);
        return selected;
    }.property('roomDay.roomEvents.@each.selected', 'roomDay.halfdayEvents.@each.selected', 'roomDay.fulldayEvent.selected'),

    selected: function() {
        var selected = false;

        console.log('parent: ' + this.get('parentView.selectedDay.id') + " :: roomid: " + this.get('roomDay.id'));
        if (this.get('parentView.selectedDay.id') === this.get('roomDay.id')) {
            selected = true;
        } else {
            selected = false;
        }

        console.log('selected: ' + selected);
        return selected || this.get('anyHourSelected');
    }.property('roomDay.id', 'parentView.selectedDay.id', 'roomDay.selected', 'anyHourSelected'),

    opptatt: function() {
        var opptatt = false;

        if (!this.get('selected') && this.get('roomDay.opptatt')) {
            opptatt = true;
        }

        return opptatt;
    }.property('roomDay.opptatt', 'selected'),

    delvisOpptatt: function() {
        var delvisOpptatt = false;

        if (!this.get('selected') && !this.get('opptatt') && this.get('roomDay.delvisOpptatt')) {
            delvisOpptatt = true;
        }

        return delvisOpptatt;
    }.property('roomDay.delvisOpptatt', 'selected', 'opptatt'),

    click: function() {
        //toggle selected
        this.set('parentView.selectedDay', this.get('roomDay'));
    }
});