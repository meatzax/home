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

var backgroundImg = Vue.extend({
    template: '#backgroundimage',
    props: {
        image_src_url: String,
    },
    ready: function() {
        var imgUrl = '/home/photo/url'
        var xhr = new XMLHttpRequest();
        var self = this;
        xhr.open('GET', imgUrl);
        xhr.onload = function() {
            self.image_src_url = JSON.parse(xhr.responseText);
        };
        xhr.send();
    },
    methods: {
        updateImage: function() {
            var imgDlUrl = '/home/photo'
            var xhr = new XMLHttpRequest();
            xhr.open('GET', imgDlUrl);
            xhr.send();
        }
    }
});

var headerComponent = Vue.extend({
    template: '#homepageheader',
});

var splashComponent = Vue.extend({
    template: '#splash'
});

var contentComponent = Vue.extend({
    template: '#content',
    data: function() {
        return {
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
        }
    },
    components: {
        'demo-grid': demoGrid,
        'list-test': listTest,
        'background-img': backgroundImg,
    },
});

var homeComponent = Vue.extend({
    template: '#home',
    components: {
        'homepageheader': headerComponent,
        'splash': splashComponent,
        'content': contentComponent,
    }
});

var app = new Vue({
    el: '#app',
    data: {
        currentView: 'home',
    },
    components: {
        home: homeComponent
    }
});



