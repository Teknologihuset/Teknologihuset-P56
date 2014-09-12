Ember.Handlebars.registerBoundHelper('markdown', function(property) {
    var converter = new Showdown.converter();
    if (property) {
        return new Handlebars.SafeString(converter.makeHtml(property));
    }
});