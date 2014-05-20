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

            this.validateBookingForm();
            if (this.get('validationErrors').length === 0) {
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
        }
    },

    firmanavnValid: function() {
        console.log('validating firmanavn');
        return this.validateFieldContentString(this.get('firmanavn'), 2);
    }.property('firmanavn'),

    epostValid: function() {
        return this.validateFieldContentString(this.get('epost'), 5);
    }.property('epost'),

    tlfValid: function() {
        return this.validateFieldContentString(this.get('tlf'), 5);
    }.property('tlf'),

    allFieldsHaveValues: function() {
        var allFields = true;

        if (!this.validateFieldContentString(this.get('firmanavn'), 2)) {
            allFields = false;
        }
        if (!this.validateFieldContentString(this.get('epost'), 5)) {
            allFields = false;
        }
        if (!this.validateFieldContentString(this.get('tlf'), 5)) {
            allFields = false;
        }
        return allFields;
    }.property('firmanavn','epost','tlf'),

    validateBookingForm: function() {
        this.set('validationErrors', []);
        if (!this.validateFieldContentString(this.get('firmanavn'), 2)) {
            this.get('validationErrors').pushObject('Du må oppgi et firmanavn');
        }
        if (!this.validateFieldContentString(this.get('epost'), 5)) {
            this.get('validationErrors').pushObject('Du må oppgi en epostaddresse!');
        }
        if (!this.validateFieldContentString(this.get('tlf'), 5)) {
            this.get('validationErrors').pushObject('Ditt telefonnummer må inneholde minst 5 tegn!');
        }
    },

    validateFieldContentString: function(fieldContent, length) {
        console.log('verifying: ' + fieldContent + " to be length: " + length);
        return (fieldContent && fieldContent.length >= length);
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