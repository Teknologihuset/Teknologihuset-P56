Teknologihuset.Router.map(function() {
    this.resource('index', {path: "/"}, function() {
        this.resource('booking', {path: "/booking"}, function() {
            this.route('week', {path: "/week/:week_id"});
            this.route('foresporsel');
            this.route('foresporselKvittering');
        });
        this.resource('rooms', {path: "/rooms"}, function() {
            this.route('room', {path: "/:room_id"});
        });
        this.resource('pages', {path: '/pages'}, function() {
            this.route('page', {path: "/:page_id"});
        });
    });
});