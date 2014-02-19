Teknologihuset.RoomsIndexRoute = Ember.Route.extend({
    model: function() {
        return this.modelFor('rooms');
    }
});