Teknologihuset.RoomsRoomRoute = Ember.Route.extend({
    model: function(room) {
        return this.store.find('room', room.room_id);
    }
});