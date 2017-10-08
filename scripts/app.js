var weatherText = "";

var app = new Vue ({
    el: '#app',
    data: {
        results: []
    },
    mounted() {
        axios.get("https://api.wunderground.com/api/f7f738f8dde51103/conditions/q/CA/Los_Angeles.json")
        .then(response => {this.results = response.data.current_observation});
    },
    updated: function() {
        weatherText = this.results.weather;
        weatherText = parseWeatherText(weatherText);
        callGetImageURL();
    }
});

function getImageURL() {
    //var flickrImgArr;
    return axios.get("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=18391479f53d149ee9f33d676616d003&tags=weather+" + weatherText + "&per_page=5&format=json&nojsoncallback=1")
    .then( response => {
        //flickrImgArr = response.data.photos.photo;
        this.response = response.data.photos.photo;
        return this.response[0];
        //return bgImageURL;
    });
}

function callGetImageURL() {
getImageURL()
.then(data => {
    var bgImageURL;
    bgImageURL = 'https://farm' + data.farm + '.staticflickr.com/' + data.server + '/' + data.id + '_' + data.secret + '_b.jpg';
    document.getElementById('bgImage').style.backgroundImage = "url(" + bgImageURL + ')';
});
}

function parseWeatherText(txt) {
    if (txt.lastIndexOf(" ") > -1) {
        txt = txt.replace(" ", "+");
    }
    return txt;
}