Teknologihuset.FormalitetVelgerComponent = Ember.Component.extend(Teknologihuset.AnimateInViewMixin, {
    elementId: "velgFormalitet",
    classNames: [],

    isUformelt: Ember.computed.not('isFormelt'),

    actions: {
        velgFormalitet: function() {
            this.set('formelt', "formelt");
            this.set('formalitetValgt', true);
        },

        velgUformalitet: function() {
            this.set('formelt', "uformelt");
            this.set('formalitetValgt', true);
        }
    },

    isValgtObserver: function() {
        if (this.get('formalitetValgt') === true && this.get('animateSelection')) {
            var self = this;
            Ember.run.scheduleOnce('afterRender', function () {
                Ember.$("#" + self.get('elementId')).animate({'marginTop': '0px', opacity: 0.5}, 500, function () {
                    Ember.$("#" + self.get('elementId') + " h1").animate({'marginBottom': '10px', opacity: 0.5}, 500);
                });
            });
        }
    }.observes('formalitetValgt').on('init'),

    formeltObserver: function() {
        if (this.get('formelt') === 'formelt') {
            this.set('isFormelt', true);
            this.set('isUformelt', false);
        } else if (this.get('formelt') === 'uformelt') {
            this.set('isFormelt', false);
            this.set('isUformelt', true);
        }
    }.observes('formelt').on('init')
});