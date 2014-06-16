Teknologihuset.RoomBookingView = Ember.View.extend({
    spriteName: null,
    templateName: 'roomBooking',
    roomIsSelected: false,
    classNames: 'pointer, roomBooking',

    actions: {
        selectRoom: function() {
            this.toggleProperty('roomIsSelected');
        },

        selectDay: function(day) {
            var previousSelectedDay = this.get('selectedDay');
            if (previousSelectedDay) {
                previousSelectedDay.set('selected', false);
            }

            day.set('selected', true);
            this.set('selectedDay', day);
        }
    },

    selectedSprite: function() {
        console.log('selectedSprite!! ' + this.get('spriteName'));
        var name = this.get('spriteName');

        if (name) {
            name = name + "_a";
        }

        return "sprite " + name;
    }.property('spriteName'),

    availableSprite: function() {
        var name = this.get('spriteName');

        if (name) {
            name = name + "_b";
        }

        return "sprite " + name;
    }.property('spriteName'),

    occupiedSprite: function() {
        var name = this.get('spriteName');

        if (name) {
            name = name + "_c";
        }

        return "sprite " + name;
    }.property('spriteName'),



    hasSelectedSlots: function() {
        var selected = false;
        var view = this;

        console.log(this.get('room'));
        if (this.get('room')) {
            this.get('room.roomDays').forEach(function(roomDay) {
                var anyHourSelected = view.anyHourSelected(roomDay);
                if (anyHourSelected) {
                    selected = true;
                }
            });
        }

        console.log(this.get('id') + " selected: " + selected);
        return selected;
    }.property('room.roomDays.length', 'room.roomDays.@each.anyEventsSelected', 'room.roomDays.@each.anyHalfdayEventsSelected', 'room.roomDays.@each.fulldayEventSelected'),

    anyHourSelected: function(roomDay) {
        var selected = false;

        if (roomDay.get('anyEventsSelected')) {
            selected = true;
        }

        if (roomDay.get('anyHalfdayEventsSelected')) {
            selected = true;
        }

        if (roomDay.get('fulldayEventSelected')) {
            selected = true;
        }

        return selected;
    },

    canBeBooked: function() {
        var canbook = true;

        if (this.get('controller.isBookingHours') && !this.get('room.room.pris')) {
            canbook = false;
        }

        if (this.get('controller.isBookingHalfday') && !this.get('room.room.halvdagspris')) {
            canbook = false;
        }

        if (this.get('controller.isBookingFullday') && !this.get('room.room.heldagspris')) {
            canbook = false;
        }

        if (this.get('isJuly')) {
            canbook = false;
        }

        console.log('canBeBooked: ' + canbook + " type: " + this.get('controller.bookingType') + " && " + this.get('room.room.pris'));
        return canbook && !this.get('isInPast');
    }.property('controller.bookingType', 'room.room.pris', 'room.room.halvdagspris', 'room.room.heldagspris', 'isInPast'),

    isInPast: function() {
        var now = new Date();
        var weekNumber = now.getWeek();

        console.log(weekNumber);
        console.log(this.get('room.roomWeek'));

        return weekNumber > this.get('room.roomWeek');
    }.property('room.roomWeek'),

    isJuly: function() {
        return this.get('room.isJuly');
    }.property('room.isJuly')
});