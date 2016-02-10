Teknologihuset.BackgroundParallaxComponent = Ember.Component.extend({
    classNames: ['backgroundParallax'],
    attributeBindings: ['backgroundRatio:data-stellar-background-ratio', 'backgroundRatio:data-stellar-ratio', 'backgroundSize:background-size', 'dataStellarVerticalOffset:data-stellar-vertical-offset', 'dataStellarOffsetParent:data-stellar-offset-parent'],
    backgroundRatio: 0.7,
    backgroundSize: "cover",

    dataStellarVerticalOffset: 0,
    dataStellarOffsetParent: true,

    didInsertElement: function() {
        var offset = 0;

        var elementId = this.get('elementId');
        console.log('elementId: ' + elementId);
        if ($("#" + elementId).offset()) {
            console.log("offset1: " + $("#" + elementId).offset().top);
            offset = ($("#" + elementId).offset().top * -1);
        }

        console.log("offset2: " + offset);

        //this.set('dataStellarVerticalOffset', offset);


    },

    dataStellarVerticalOffsetObserver: function() {
        var elementId = this.get('elementId');
        $("#" + elementId).stellar();
    }.observes('dataStellarVerticalOffset'),

    photoUrlObserver: function() {
        Ember.run.schedule('afterRender', this, function(){
            this.updateBackground();
        });
    }.observes('photo').on('init'),

    updateBackground: function() {

        var component = this;
        $('#' + this.get('elementId')).fadeOut(function() {
            $('#' + component.get('elementId')).css('background', 'url("' + component.get('photoUrl') + '") 0% 50% no-repeat').css('background-size', 'cover').fadeIn('slow');
        });

        $("#" + this.get('elementId')).stellar();
        //component.set('shortDescription', component.currentPhotoDescription());
    }
});