Ember.Handlebars.registerBoundHelper('buttonDate', function(property) {
    if (property) {
        return moment(property).format('dd D MMM');
    }
});

Ember.Handlebars.registerBoundHelper('dmy', function(property) {
    if (property) {
        return moment(property).format('DD/MM/YYYY');
    }
});