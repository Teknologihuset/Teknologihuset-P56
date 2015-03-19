Teknologihuset.Router.map(function() {
    this.resource('index', {path: "/"}, function() {
        this.resource('booking', {path: "/booking"}, function() {
            this.route('week', {path: "/week/:week_id"});
            this.route("day", {path: "/day/:day_id"});
            this.route('foresporsel');
            this.route('foresporselKvittering');
        });
        this.resource('rooms', {path: "/rooms"}, function() {
            this.route('room', {path: "/:room_id"});
        });
        this.resource('pages', {path: '/pages'}, function() {
            this.route('page', {path: "/:page_id"});
        });
        this.resource("partnere", {path: '/partnere'});
        this.resource("community", {path: '/community'});
        this.resource("viTilbyr", function() {
            this.route("2ndFloor", function() {
                this.route("lysningen");
                this.route("blikkfang");
                this.route("spillrommet");

            });
            this.route("3rdFloor", function() {
                this.route("fyrtaarnet");
                this.route("inspirasjon");
                this.route("innsikt");
            });
        });
    });
});