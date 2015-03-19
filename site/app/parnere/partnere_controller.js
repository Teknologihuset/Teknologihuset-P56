Teknologihuset.PartnereController = Ember.ObjectController.extend({
    currQuotePage: 0,

    sortProperties: ['name:asc'],
    sortedPartners: Ember.computed.sort('partners', 'sortProperties'),


    hasAtLeastTwoQuotes: function() {
        return this.get('quotes.length') >= 2;
    }.property('quotes.length'),

    currQuotes: function() {
        var currQ = [];

        if (this.get('quotes')) {
            var firstQuoteIndex = this.get('currQuotePage') * 2;

            var firstQuote = this.get('quotes').objectAt(firstQuoteIndex);
            var secondQuote = this.get('quotes').objectAt(firstQuoteIndex+1);

            if (firstQuote) {
                currQ.pushObject(firstQuote);
            }

            if (secondQuote) {
                currQ.pushObject(secondQuote);
            }

        }

        return currQ;
    }.property('quotes.length', 'currQuotePage')
});