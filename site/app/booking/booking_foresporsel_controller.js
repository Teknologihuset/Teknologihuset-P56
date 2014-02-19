Teknologihuset.BookingForesporselController = Ember.Controller.extend({
    needs: ['bookingWeek'],

    actions: {
        removeHour: function(hour) {
            this.get('controllers.bookingWeek.selectedHours').removeObject(hour);
        },

        sendBookingInquiry: function() {
            var selectedHours = this.get('controllers.bookingWeek.selectedHours');

            var hourIds = [];
            selectedHours.forEach(function(hour) {
                hourIds.pushObject(hour.get('id'));
            });

            console.log('selectedHours');
            console.log(selectedHours);
            console.log(selectedHours.length);

            var bookingInquiry = this.store.createRecord('bookingInquiry', {
                firmanavn: this.get('firmanavn'),
                epost: this.get('epost'),
                tlf: this.get('tlf'),
                beskrivelse: this.get('beskrivelse'),
                oenskerBevertning: this.get('oenskerLevering'),
                events: hourIds
            });

            var controller = this;
            bookingInquiry.save().then(function(data) {
                console.log('booking Inquiry saved');
                controller.resetForm();
                controller.transitionToRoute('booking.foresporselKvittering');
            }, function(data) {
                console.log('booking Inquiry failed!');
            });
        }
    },

    resetForm: function() {
        this.set('controllers.bookingWeek.selectedHours', []);
        this.set('firmanavn', null);
        this.set('epost', null);
        this.set('tlf', null);
        this.set('beskrivelse', null);
        this.set('oenskerBevertning', false);
    }
});