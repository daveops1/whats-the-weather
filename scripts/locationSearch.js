//Return real-time search results from Weatherground autocomplete API
//Get Weather Underground JSON for list of locations to search on.

function doSearch(text) {
    var request = new XMLHttpRequest();
    var queryURL = 'https://cors-anywhere.herokuapp.com/http://autocomplete.wunderground.com/aq?query=' + text
    
    //Get datalist and input elements
    var dataList = document.getElementById('locations');
    var inputSearch = document.getElementById('txtSearch');

    request.onreadystatechange = function(response) {
        
        if (request.readyState === 4) {
            if (request.status === 200) {
                //Parse the JSON
                var jsonLocations = JSON.parse(request.responseText);

                //Loop over array and populate datalist
                jsonLocations.RESULTS.forEach(function(item) {
                    var option = document.createElement('option');
                    option.label = item.name;
                    option.value = item.l;
                    dataList.appendChild(option);
                });
            }
        }
    };
    request.open('GET', queryURL, true);
    request.send();
}