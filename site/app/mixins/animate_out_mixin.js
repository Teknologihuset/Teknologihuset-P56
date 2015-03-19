Teknologihuset.AnimateOutViewMixin = Ember.Mixin.create({
    willDestroyElement: function() {
        this._super();

        console.log('AnimateOutViewMixin willDestroyElement!!');

        this.animateOut();
    },

    animateOut: function() {
        console.log('animateIn: ' + this.get('elementId'));
        console.log('parent: ' + this.get('_view'));
        console.log('animateCssClass: ' + this.get('animateCssClass'));

        var cssClass = this.get('animateCssClass');
        if (cssClass) {
            var cloned = $("." + cssClass).first().clone();

            this.$().parent().prepend(clone);
            clone.fadeOut(function() {

            });
        } else {
            var clone = this.$().clone();
            this.$().parent().prepend(clone);
            clone.fadeOut(function() {

            });
        }
    }
});