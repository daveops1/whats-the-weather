var app = new Vue ({
    el: '#app',
    data: {
        location: 'Los Angeles, CA',
        temperature: '75 degrees',
        conditions: 'cloudy',
    }
});

//how to get image url from Flickr API results
//https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
//'url('+ '\'https://farm.' + results[0].farm-id + '.staticflickr.com/' + results[0].server-id + '/' + results[0].id + '_' + results[0].secret + '.jpg' + ')' }