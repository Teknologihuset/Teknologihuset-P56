Teknologihuset.RoomDescriptionComponent = Ember.Component.extend(Teknologihuset.AnimateInViewMixin, {
    deltakere: function() {
        var qp = "faa";
        if (this.get('room.kapasitet') > 20) {
            qp = "mange";
        }

        return qp;
    }.property('room.kapasitet')
});