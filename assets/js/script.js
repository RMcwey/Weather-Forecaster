
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
var inputBox = $('input')
var searchButton = $('#search-btn')
var searchInput;
var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=925aacac62e7fb2f553876f1d65a3104`
var fetchedData;
var cityH4 = document.querySelector('h4');
var currentTemp = document.querySelectorAll('p');


function searchInputField () {
    searchInput = document.querySelector('input').value;
    requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&units=imperial&appid=925aacac62e7fb2f553876f1d65a3104`
    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        fetchedData = data
        console.log(data);
        currentDayData(fetchedData)
    });
    // could be fetchedData
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
    console.log(inputBox.val())
});
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