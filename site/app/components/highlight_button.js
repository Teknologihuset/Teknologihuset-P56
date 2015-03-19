Teknologihuset.HighlightButtonComponent = Ember.Component.extend({
    tagName: 'button',
    classNames: ['tn-btn'],
    classNameBindings: ['isButtonSelected'],
    selected: false,
    active: false,

    actions: {
        clickedAction: function() {
            this.sendAction();
        }
    },

    click: function() {
        this.sendAction('clickedAction');
    },

    isButtonSelected: function() {
        console.log('isButtonSelected: ' + this.get('active') + " :: " + this.get('selected'));
        if (this.get('active') === true && this.get('selected') === true) {
            return this.get('selectedClassName');
        } else {
            return this.get('nonSelectedClassName');
        }
    }.property('active', 'selected')
});