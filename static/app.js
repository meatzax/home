Vue.config.delimiters = ["{!!", "!!}"];

var demoGrid = Vue.extend({
    template: '#grid-template',
    props: {
        data:  Array,
        columns: Array,
        filterKey: String
    },
    data: function () {
        var sortOrders = {};
        this.columns.forEach(function (key) {
            sortOrders[key] = 1
        });
        return {
            sortKey: '',
            sortOrders: sortOrders
        };
    },
    methods: {
        sortBy: function(key) {
            this.sortKey = key;
            this.sortOrders[key] = this.sortOrders[key] * -1
        }
    }
});

var listTest = Vue.extend({
    template: '#list-template',
    props: {
        listitems: Array
    }
});


Vue.component('demo-grid', demoGrid);
Vue.component('list-test', listTest);

var imgURL = '/home/photo/url'

var demo = new Vue({
    el: '#demo',
    data: {
        searchQuery: '',
        gridColumns: ['name', 'power', 'favecolor'],
        gridData: [
            { name: 'Chuck Norris', power: Infinity, favecolor: 'blue' },
            { name: 'Bruce Lee', power: 9000, favecolor: 'yellow' },
            { name: 'Jackie Chan', power: 7000, favecolor: 'red' },
            { name: 'Jet Li', power: 8000, favecolor: 'green' }
        ],
        listItems: [
            { message: 'Foo' },
            { message: 'Bar' }
        ],
        image_src_url: '',
    },
    methods: {
        fetchData: function() {
            var xhr = new XMLHttpRequest();
            var self = this;
            xhr.open('GET', imgURL);
            xhr.onload = function() {
                self.image_src_url = JSON.parse(xhr.responseText)
            };
            xhr.send();
        }
    }
});