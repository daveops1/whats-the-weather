//Return real-time search results from Weatherground autocomplete API
//Get Weather Underground JSON for list of locations to search on.

function doSearch(text) {
    var request = new XMLHttpRequest();
    var queryURL = 'https://cors-anywhere.herokuapp.com/http://autocomplete.wunderground.com/aq?query=' + text;
    
    //Get datalist and input elements
    var dataList = document.getElementById('locations');
    var inputSearch = document.getElementById('txtSearch');

    request.onreadystatechange = function(response) {
        if (request.readyState === 4) {
            if (request.status === 200) {
                //Parse the JSON
                var jsonLocations = JSON.parse(request.responseText);
                
                var top10 = jsonLocations.RESULTS.sort(function(a, b) { return a.Variable1 < b.Variable1 ? 1 : -1; })
                .slice(0, 10);
                
                //Clear list so no duplicates
                dataList.textContent = '';

                //Loop over array and populate datalist
                top10.forEach(function(item) {
                    var option = document.createElement('option');
                    option.label = item.name;
                    option.value = item.name + " - " + item.l;
                    dataList.appendChild(option);
                });
            }
        }
    };
    request.open('GET', queryURL, true);
    request.send();
}