
// Search
// funtion: event handler
// 1. Read the value from the textbox into a variable
// 2. Create Url for Fetch
// 3. Fetch results
// 4. Call Function to update after results

// Function: DoResults
// 1. Call function Add search term to results
// 2. Call function add today's results
// 3. Call funtion Add 5 days results
// 4. Clear out the text box

// Recent Searches
// Function: Add searchterm to results
// Parameter In: Search Term
// 1. add a button to the screen, with a data attribute that stores the search term (local storage)

// function: Event Handler (for search buttons)
// 1. Read the data attribute to get the search term.
// 2. Call search Function

// Results Today
// Function add today's results

// results 5 days
// function add 5 days results

// `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},{US}&limit={limit}&appid=925aacac62e7fb2f553876f1d65a3104` 5 day limit 5
var inputBox = $('input')
var searchButton = $('#search-btn')
var searchInput;
var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&units=imperial&appid=925aacac62e7fb2f553876f1d65a3104`
var fetchedData;
var cityH4 = document.querySelector('h4');
var currentTemp = document.querySelectorAll('p');
var latitude;
var longitude;


function searchInputField () {
    inputBox = 
    searchInput = document.querySelector('input').value;
    var splitWords = searchInput.split(" ");
    console.log(splitWords)
    var city = splitWords[0].replace(/,/g, '');
    var state = splitWords[1];
    console.log(city);
    console.log(state);
    requestUrlLatLon = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},{US}&appid=925aacac62e7fb2f553876f1d65a3104`;

    fetch(requestUrlLatLon)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        fetchedData = data
        console.log(data);
        latlonFunc(fetchedData)
    });

}

function latlonFunc (fetchedData) {
latitude = fetchedData[0].lat
    console.log(latitude)
longitude = fetchedData[0].lon
    console.log(longitude)

}

function currentDayData(fetchedData) {
    console.log(fetchedData.name);
    cityH4.textContent = fetchedData.name;
    console.log(fetchedData.main.temp)
    // tempFetch = fetchedData.main.temp
    currentTemp[0].innerHTML = "Temp: " + fetchedData.main.temp + "°F";
    currentTemp[1].innerHTML = "Wind: " + fetchedData.wind.speed + " MPH";
    currentTemp[2].innerHTML = "Humidity: " + fetchedData.main.humidity + " %";
    

}


searchButton.on('click', function () {
    searchInputField();
    // console.log(inputBox.val())
});


    // var latitude = searchInput.coord.lat
    // var longitude = searchInput.coord.lon

    // console.log(latitude)
    // city.substring(0, city.length - 1);
    // if (city.indexOf(',') > -1) {
    //     var city1 = city.substring
    //     console.log(city1)
    // }
   
   
    // fetch(requestUrl)
    // .then(function (response) {
    //     return response.json();
    // })
    // .then(function (data) {
    //     fetchedData = data
    //     console.log(data);
    //     currentDayData(fetchedData)
    // });
    // could be fetchedData

// weather[0].current

// $( function() {
//     var availableTags = [
//       "ActionScript",
//       "AppleScript",
//       "Asp",
//       "BASIC",
//       "C",
//       "C++",
//       "Clojure",
//       "COBOL",
//       "ColdFusion",
//       "Erlang",
//       "Fortran",
//       "Groovy",
//       "Haskell",
//       "Java",
//       "JavaScript",
//       "Lisp",
//       "Perl",
//       "PHP",
//       "Python",
//       "Ruby",
//       "Scala",
//       "Scheme"
//     ];
//     $( "#tags" ).autocomplete({
//       source: availableTags
//     });
//   } );