Teknologihuset.CommunityEventComponent = Ember.Component.extend({
    click: function() {
        this.sendAction('eventClicked', this.get('event'));
    },

    isSelectedObserver: function() {
        console.log('CommunityEventComponent: isSelectedObserver: ' + this.get('event.isSelected'));
        var isSelected = this.get('event.isSelected');

        var elementId = this.get('elementId');
        if (isSelected) {
            Ember.run.schedule("afterRender", function() {
                Ember.$("#" + elementId + " .index-community-event-description").first().hide().slideDown();
                Ember.$('html, body').animate({
                    scrollTop: $("#" + elementId).offset().top
                }, 500);
            });
        } else {
            //Not working, as the {{#if ...}} removes the item before it can be cloned.
            Ember.run.schedule("afterRender", function() {
                var clone = Ember.$("#" + elementId + " .index-community-event-description").first().clone();
                Ember.$("#" + elementId).append(clone);
                clone.slideUp();
            });
        }
    }.observes('event.isSelected')
});