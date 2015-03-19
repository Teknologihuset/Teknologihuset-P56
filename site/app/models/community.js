Teknologihuset.Community = DS.Model.extend({
    name: DS.attr('string'),
    cLogo: DS.belongsTo('upload', {async: true}),
    content: DS.attr('string'),
    http: DS.attr('string')
});