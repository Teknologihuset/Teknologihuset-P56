Teknologihuset.DeltakereVelgerComponent = Ember.Component.extend(Teknologihuset.AnimateInViewMixin, {
    elementId: 'deltakereVelger',

    classNameBindings: ['initialClassName'],


    actions: {
        velgFaaDeltakere: function() {
            this.set('deltakere', "faa");
            this.set('antallDeltakereValgt', true);
        },

        velgMangeDeltakere: function() {
            this.set('deltakere', "mange");
            this.set('antallDeltakereValgt', true);
        }
    },

    isValgtObserver: function() {
        if (this.get('antallDeltakereValgt') === true && this.get('animateSelection')) {
            var self = this;
            /*Ember.run.scheduleOnce('afterRender', function() {
                Ember.$("#" + self.get('elementId')).animate({ 'marginTop': '0px', opacity: 0.5 }, 500, function() {
                    Ember.$("#" + self.get('elementId') + " h1").animate({ 'marginBottom': '10px', opacity: 0.5 }, 500);
                });
            });*/
        }
    }.observes('antallDeltakereValgt').on('init'),

    deltakereObserver: function() {
        if (this.get('deltakere') === 'faa') {
            this.set('isFaaDeltakere', true);
            this.set('isMangeDeltakere', false);
        } else if (this.get('deltakere') === 'mange') {
            this.set('isFaaDeltakere', false);
            this.set('isMangeDeltakere', true);
        }
    }.observes('deltakere').on('init')
});