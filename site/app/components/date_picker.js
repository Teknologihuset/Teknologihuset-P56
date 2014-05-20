Teknologihuset.DatePickerComponent = Ember.Component.extend({
    classNames: ['text-center','fullWidth'],

    didInsertElement: function() {
        var comp = this;
        $("#" + this.get('elementId')).datepicker({
            "calendarWeeks": true,
            "startDate": new Date(),
            "weekStart": 1,
            "todayBtn": true,
            "todayHighlight": true
        })
            .on("changeDate", function(e){
                console.log('new date picked: ' + e);
                console.log(e.date.getWeek());
                var weekNum = e.date.getWeek();
                var year = e.date.getFullYear();

                if (year && weekNum) {
                    comp.sendAction('action', year + ";" + weekNum);
                }
            });
    }
});