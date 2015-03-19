Teknologihuset.BookingButtonLargeComponent = Ember.Component.extend({
    actions: {
        toggleEvent: function(roomDay, roomEvent) {
            console.log('BookingButtonLargeComponent toggleEvent');
            this.sendAction('clicked', {roomDay: roomDay, roomEvent: roomEvent});
        }
    }
});