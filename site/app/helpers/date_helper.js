Ember.Handlebars.registerBoundHelper('buttonDate', function(property) {
    if (property) {
        return moment(property).format('dd D MMM');
    }
});

Ember.Handlebars.registerBoundHelper('fullDate', function(property) {
    if (property) {
        return moment(property).format('dddd D MMMM YYYY');
    }
});

Ember.Handlebars.registerBoundHelper('numberToMonth', function(month, year) {
    if (month && year) {
        return moment(year + "-" + ('0' + month).slice(-2) + "-01").format('MMMM YYYY');
    }
});

Ember.Handlebars.registerBoundHelper('dmy', function(property) {
    if (property) {
        return moment(property).format('DD/MM/YYYY');
    }
});