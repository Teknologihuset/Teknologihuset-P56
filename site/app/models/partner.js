Teknologihuset.Partner = DS.Model.extend({
    name: DS.attr('string'),
    pLogo: DS.belongsTo('upload', {async: true}),
    content: DS.attr('string'),
    http: DS.attr('string')
});