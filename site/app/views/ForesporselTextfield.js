Teknologihuset.ForesporselTextfield = Ember.TextField.extend({
    minLength: null,

    classNameBindings: 'hasError',

    hasError: function() {
        var minLength = this.get('minLength');

        if (minLength && this.get('value') && this.get('value').length > 0 && this.get('value').length < minLength) {
            return true;
        }
        return false;
    }.property('value','minLength')
});