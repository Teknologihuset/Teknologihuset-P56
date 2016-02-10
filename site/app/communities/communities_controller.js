Teknologihuset.CommunityController = Ember.ObjectController.extend({
    currQuotePage: 0,

    sortProperties: ['name:asc'],
    sortedCommunities: Ember.computed.sort('communities', 'sortProperties'),

    hasAtLeastTwoQuotes: function() {
        return this.get('currQuotes.length') >= 2;
    }.property('currQuotes.length'),

    currQuotes: function() {
        var currQ = [];

        if (this.get('quotes')) {
            this.get('quotes').forEach(function(quote) {
                if (quote.get('type') === 'community') {
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