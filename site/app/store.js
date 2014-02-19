DS.RESTAdapter.reopen({
    namespace: 'json'
});

Teknologihuset.Store = DS.Store.extend({
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