Teknologihuset.Room = DS.Model.extend({
    roomName: DS.attr('string'),
    kapasitet: DS.attr('number'),
    pris: DS.attr('number'),
    halvdagspris: DS.attr('number'),
    heldagspris: DS.attr('number'),
    sorteringsIndex: DS.attr('number'),
    content: DS.attr('string'),

    markdown: function() {
        if (this.get('content')) {
            var converter = new Showdown.converter();
            return new Handlebars.SafeString(converter.makeHtml(this.get('content')));
        } else {
            return "";
        }
    }.property('content')
});