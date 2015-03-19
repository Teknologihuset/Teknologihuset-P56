Teknologihuset.DatePickerComponent = Ember.Component.extend({
    classNames: ['text-center','fullWidth'],

    didInsertElement: function() {

        var elementId = this.get('elementId');
        $("#" + elementId).hide();

        var comp = this;
        $("#" + this.get('elementId')).datepicker({
            "calendarWeeks": true,
            "startDate": new Date(),
            daysOfWeekDisabled: [0,6],
            "weekStart": 1,
            "todayBtn": true,
            "todayHighlight": true,
            "language": "no"
        }).on("changeDate", function(e){
                console.log('new date picked: ' + e);
                console.log(e.date.getWeek());
                var dateStr = moment(e.date).format('YYYY-MM-DD');

                if (dateStr) {
                    comp.sendAction('action', dateStr);
                }
            });

        Ember.run.schedule("afterRender", function() {
            $("#" + elementId).slideDown();
        });
    }
});