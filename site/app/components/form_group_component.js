Teknologihuset.FormGroupComponent = Ember.Component.extend({
    classNames: ['form-group','has-feedback'],
    classNameBindings: ['hasSuccess', 'hasWarning'],

    hasSuccess: function() {
        return this.get('inputValid');
    }.property('inputValid'),

    hasWarning: function() {
        return !this.get('hasSuccess');
    }.property('hasSuccess')
});