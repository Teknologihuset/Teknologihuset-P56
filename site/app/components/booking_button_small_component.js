Teknologihuset.BookingButtonSmallComponent = Ember.Component.extend({
    actions: {
        toggleEvent: function(roomDay, roomEvent) {
            console.log('BookingButtonSmallComponent toggleEvent');
            this.sendAction('clicked', {roomDay: roomDay, roomEvent: roomEvent});
        }
    }
});