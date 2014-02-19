/*
    Not in use yet
*/
Teknologihuset.BookingInquiry = DS.Model.extend({
    firmanavn: DS.attr('string'),
    epost: DS.attr('string'),
    tlf: DS.attr('string'),
    beskrivelse: DS.attr('string'),
    oenskerBevertning: DS.attr('boolean'),

    events: DS.attr('raw'),

    start: function() {
        var events = this.get('events');
        var start = null;

        if (events) {
            events.forEach(function(event) {
                if (start === null || event.start() < start) {
                    start = event.get('start');
                }
            });
        }

        return start;
    }.property('events.length'),

    end: function() {
        var events = this.get('events');
        var end = null;

        if (events) {
            events.forEach(function(event) {
                if (end === null || event.start() > end) {
                    end = event.get('end');
                }
            });
        }

        return end;
    }.property('events.length'),

    contains: function(event) {
        var doContain = false;

        var events = this.get('events');

        if (events) {
            events.forEach(function(event) {
                if (event.get('id') === event.get('id')) {
                    doContain = true;
                }
            });
        }

        return doContain;
    }
});