var weatherText = "";
var imgData = "";
var bgImageURL = "";

var app = new Vue ({
    el: '#app',
    data: {
        results: null
    },
    
    methods: {
        showWeather() {
            var selectedLocationValue = stripText(document.getElementById('txtSearch').value);
            
            axios.get("http://api.wunderground.com/api/f7f738f8dde51103/conditions" + selectedLocationValue + ".json")
                .then((response) => {
                    this.results = response.data.current_observation;
                    weatherText = this.results.weather;
                    weatherText = parseWeatherText(weatherText);
                    return axios.get("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=18391479f53d149ee9f33d676616d003&tags=" + "'weather'" + weatherText + "&per_page=5&format=json&nojsoncallback=1");
                })
                .then ((response) => {
                    imgData = response.data.photos.photo;
                    bgImageURL = 'https://farm' + imgData[0].farm + '.staticflickr.com/' + imgData[0].server + '/' + imgData[0].id + '_' + imgData[0].secret + '_b.jpg';
                    document.getElementById('bgImage').style.backgroundImage = "url(" + bgImageURL + ')';
                });
        }
    }
});

function parseWeatherText(txt) {
    if (txt.lastIndexOf(" ") > -1) {
        txt = txt.replace(" ", ",");
    }
    return txt;
}

function stripText(val) {
    if (val.lastIndexOf(" - ") > -1) {
        val = val.substring(val.indexOf("/") + 0);
    }
    return val;
}