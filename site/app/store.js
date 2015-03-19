DS.RESTAdapter.reopen({
    namespace: 'json'
});

Teknologihuset.ApplicationStore = DS.Store.extend({
    adapter:  "DS.RESTAdapter"
});

Teknologihuset.RawTransform = DS.Transform.extend({
    deserialize: function(serialized) {
        return serialized;
    },
    serialize: function(deserialized) {
        return deserialized;
    }
});

Ember.Inflector.inflector.irregular('community', 'communities');

Teknologihuset.PageAdapter = DS.RESTAdapter.extend({
    namespace: 'json/data'
});

Teknologihuset.QuoteAdapter = DS.RESTAdapter.extend({
    namespace: 'json/data'
});

Teknologihuset.RoomAdapter = DS.RESTAdapter.extend({
    namespace: 'json/data'
});

Teknologihuset.UploadAdapter = DS.RESTAdapter.extend({
    namespace: 'json/data'
});

Teknologihuset.PartnerAdapter = DS.RESTAdapter.extend({
    namespace: 'json/data'
});

Teknologihuset.CommunityAdapter = DS.RESTAdapter.extend({
    namespace: 'json/data'
});