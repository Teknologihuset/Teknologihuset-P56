Teknologihuset.Page = DS.Model.extend({
    name: DS.attr('string'),
    content: DS.attr('string'),
    overskrift: DS.attr('string'),
    ingress: DS.attr('string'),
    forsideInnhold: DS.attr('string'),
    forsidePlassering: DS.attr('string'),
    erArtikkel: DS.attr('boolean'),
    bilde: DS.attr('string'),
    toppmeny: DS.attr('boolean'),
    childPages: DS.hasMany('page'),
    toppIndex: DS.attr('number'),
    route: DS.attr('string'),

    markdown: function() {
        if (this.get('content')) {
            var converter = new Showdown.converter();
            return new Handlebars.SafeString(converter.makeHtml(this.get('content')));
        } else {
            return "";
        }
    }.property('content')
});