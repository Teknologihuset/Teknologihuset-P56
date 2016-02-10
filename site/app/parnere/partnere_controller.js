Teknologihuset.PartnereController = Ember.ObjectController.extend({
    currQuotePage: 0,

    sortProperties: ['name:asc'],
    sortedPartners: Ember.computed.sort('partners', 'sortProperties'),

    hasAtLeastTwoQuotes: function() {
        return this.get('currQuotes.length') >= 2;
    }.property('currQuotes.length'),

    currQuotes: function() {
        var currQ = [];

        if (this.get('quotes')) {
            this.get('quotes').forEach(function(quote) {
                if (quote.get('type') === 'partnere') {
                    currQ.pushObject(quote);
                }

                if (currQ.get('length') >= 2) {
                    return currQ;
                }
            });
        }

        return currQ;
    }.property('quotes.length', 'currQuotePage')
});