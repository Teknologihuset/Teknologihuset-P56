Teknologihuset.IndexIndexController = Ember.ObjectController.extend({
    needs: ['index'],

    currMonth: Teknologihuset.currentMonth(),
    currYear: Teknologihuset.currentYear(),

    currentEvent: null,

    sortProperties: ['start:asc'],
    sortedCommunityEvents: Ember.computed.sort('communityEvents', 'sortProperties'),

    actions: {
        eventClicked: function(event) {
            if (event !== this.get('currentEvent')) {
                if (this.get('currentEvent')) {
                    this.get('currentEvent').set('isSelected', false);
                }

                event.set('isSelected', true);
                this.set('currentEvent', event);
            }
        },

        prevMonth: function() {
            var currMonth = this.get('currMonth');
            var currYear = this.get('currYear');
            var controller = this;

            //Ember.$(".index-community-events-page").first().fadeOut(function() {
                var prevMonth = moment(currYear + "-" + ('0' + currMonth).slice(-2) + "-01").subtract(1, 'months');

                controller.set('currMonth', prevMonth.month()+1);
                controller.set('currYear', prevMonth.year());
            //});
        },

        nextMonth: function() {
            var currMonth = this.get('currMonth');
            var currYear = this.get('currYear');
            var controller = this;

            //Ember.$(".index-community-events-page").first().fadeOut(function() {
                var prevMonth = moment(currYear + "-" + ('0' + currMonth).slice(-2) + "-01").add(1, 'months');

                controller.set('currMonth', prevMonth.month()+1);
                controller.set('currYear', prevMonth.year());
            //});
        }
    },

    currMonthObserver: function() {
        var controller = this;

        var cloned = Ember.$(".index-community-events-area").first().clone();
        cloned.find('.ember-view').removeAttr('id');
        Ember.$(".index-community-events-column").first().prepend(cloned);

        cloned.prepend('<div class="spinner-overlay"><i class="fa fa-spinner fa-spin"></i></div>');


        this.store.find('communityEvent', {month: this.get('currMonth'), year: this.get('currYear')}).then(function(data) {
            controller.set('communityEvents', data);

            cloned.slideUp(500, function() {
                cloned.remove();
            });

        });

    }.observes('currYear', 'currMonth').on('init')
});