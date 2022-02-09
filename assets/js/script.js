var inputBox = $('input')
var searchButton = $('#search-btn')
var searchInput;
var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&units=imperial&appid=925aacac62e7fb2f553876f1d65a3104`
var fetchedData;
var cityH4 = document.querySelector('h4');
var currentTemp = document.querySelectorAll('p');
var uvi = document.querySelector('span');
var fiveDayCards = $('#five-day-cards');
var forecastCards;
var latitude;
var longitude;
var ClickCount = 1;
var searchItem = 0;

loadSaved();

function searchInputField () {
    inputBox = 
    searchInput = document.querySelector('input').value;
    var splitWords = searchInput.split(",");
    console.log(splitWords)
    var city = splitWords[0].replace(/,/g, '');
    var state = splitWords[1];
    console.log(city);
    console.log(state);
    requestUrlLatLon = `https://api.openweathermap.org/geo/1.0/direct?q=${city},${state},{US}&appid=925aacac62e7fb2f553876f1d65a3104`;

    fetch(requestUrlLatLon)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        fetchedData = data
        console.log(data);
        latlonFunc(fetchedData)
    });

};

function latlonFunc (fetchedData) {
    latitude = fetchedData[0].lat
    console.log(latitude)
    longitude = fetchedData[0].lon
    console.log(longitude)
    getCurrentDayData();
};

function getCurrentDayData () {
    requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=imperial&appid=925aacac62e7fb2f553876f1d65a3104`
    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        fetchedCurrentData = data
        console.log(data);
        applyCurrentDayData(fetchedCurrentData)
    });
};

function applyCurrentDayData(fetchedCurrentData) {
    // converts unix date given by api into mm/dd/yyyy 

    const unixTimestamp = fetchedCurrentData.current.dt
    console.log(unixTimestamp)
    const event = new Date(unixTimestamp * 1000);
    console.log(event)
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const humanDateFormat = event.toLocaleDateString(options)

    console.log(humanDateFormat)
    cityH4.textContent = "Current Weather: " + searchInput + " " + humanDateFormat;
    // fetchedCurrentData.current.dt (1644363812)
    var uviData = fetchedCurrentData.current.uvi
    currentTemp[0].innerHTML = "Temp: " + fetchedCurrentData.current.temp + "°F";
    currentTemp[1].innerHTML = "Wind: " + fetchedCurrentData.current.wind_speed + " MPH";
    currentTemp[2].innerHTML = "Humidity: " + fetchedCurrentData.current.humidity + " %";
    uvi.innerHTML = uviData ;

    if (uviData < 3) {
        uvi.classList.add("uv-green");
    } else if (uviData < 6) {
        uvi.classList.add("uv-yellow")
    } else if (uviData < 8) {
        uvi.classList.add("uv-orange")
    } else {
        uvi.classList.add("uv-red")
    }

    let foreCast = []
    for (let i = 1; i < 6; i++) {
        let day = fetchedCurrentData.daily[i];
        let forecastDay = day.dt;
        const forecastDate = new Date(forecastDay * 1000);
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        let humanDateFormatDay = forecastDate.toLocaleDateString(options);
        let tempMax = day.temp.max;
        let tempMin = day.temp.min;
        let forecastWind = day.wind_speed;
        let forecastHumidity = day.humidity;
        let cardNum = i;
        console.log(cardNum)
        foreCast.push({humanDateFormatDay, tempMax, tempMin, forecastWind, forecastHumidity, cardNum})
    } 
    renderForecast(foreCast)
};
    function renderForecast(foreCast) {
        foreCast.forEach(function({humanDateFormatDay, tempMax, tempMin, forecastWind, forecastHumidity, cardNum}) {
        // var fiveDayCards = $('#five-day-cards');
        
        const forecastCards = 
        $(`<div class="card card${cardNum} col">
              <h6>${humanDateFormatDay}</h6>
              <p>High: ${tempMax}</p>
              <p>Low: ${tempMin}</p>
              <p>Wind: ${forecastWind}</p>
              <p>Humidity: ${forecastHumidity}</p>
            </div>`)
        fiveDayCards.append(forecastCards)
        });

        countClicks();
    };
    // counts the number of searches created and limits them.
    function countClicks() {
        var clickLimit = 10; //Max number of clicks
        if(ClickCount <= clickLimit) {
            ClickCount++;
            storeInput();
        }
        else if(ClickCount > clickLimit) {
            return;
        }
    }

function storeInput () {
    var search1 = localStorage.getItem('search1');
    var search2 = localStorage.getItem('search2');
    var search3 = localStorage.getItem('search3');
    var search4 = localStorage.getItem('search4');
    var search5 = localStorage.getItem('search5');
    var search6 = localStorage.getItem('search6');
    var search7 = localStorage.getItem('search7');
    var search8 = localStorage.getItem('search8');
    var search9 = localStorage.getItem('search9');
    var search10 = localStorage.getItem('search10');

    if (search1 == null){
        
        searchItem++;
        var priorSearches = $('#prior-searches');
        var priorSearchesButton = $(`<button class="prior-search-items" id="search${searchItem}">${searchInput}</button>`);
        
        priorSearches.append(priorSearchesButton);
    } else if (search2 == null) {
        searchItem = 1;
        searchItem++;
        var priorSearches = $('#prior-searches');
        var priorSearchesButton = $(`<button class="prior-search-items" id="search${searchItem}">${searchInput}</button>`);
    
        priorSearches.append(priorSearchesButton);
    } else if (search3 == null) {
        searchItem = 2;
        searchItem++;
        var priorSearches = $('#prior-searches');
        var priorSearchesButton = $(`<button class="prior-search-items" id="search${searchItem}">${searchInput}</button>`);
    
        priorSearches.append(priorSearchesButton);
    } else if (search4 == null) {
        searchItem = 3;
        searchItem++;
        var priorSearches = $('#prior-searches');
        var priorSearchesButton = $(`<button class="prior-search-items" id="search${searchItem}">${searchInput}</button>`);
    
        priorSearches.append(priorSearchesButton); 
    } else if (search5 == null) {
        searchItem = 4;
        searchItem++;
        var priorSearches = $('#prior-searches');
        var priorSearchesButton = $(`<button class="prior-search-items" id="search${searchItem}">${searchInput}</button>`);
    
        priorSearches.append(priorSearchesButton); 
    } else if (search6 == null) {
        searchItem = 5;
        searchItem++;
        var priorSearches = $('#prior-searches');
        var priorSearchesButton = $(`<button class="prior-search-items" id="search${searchItem}">${searchInput}</button>`);
    
        priorSearches.append(priorSearchesButton); 
    } else if (search7 == null) {
        searchItem = 6;
        searchItem++;
        var priorSearches = $('#prior-searches');
        var priorSearchesButton = $(`<button class="prior-search-items" id="search${searchItem}">${searchInput}</button>`);
    
        priorSearches.append(priorSearchesButton); 
    } else if (search8 == null) {
        searchItem = 7;
        searchItem++;
        var priorSearches = $('#prior-searches');
        var priorSearchesButton = $(`<button class="prior-search-items" id="search${searchItem}">${searchInput}</button>`);
    
        priorSearches.append(priorSearchesButton); 
    } else if (search9 == null) {
        searchItem = 8;
        searchItem++;
        var priorSearches = $('#prior-searches');
        var priorSearchesButton = $(`<button class="prior-search-items" id="search${searchItem}">${searchInput}</button>`);
    
        priorSearches.append(priorSearchesButton); 
    } else if (search10 == null) {
        searchItem = 9;
        searchItem++;
        var priorSearches = $('#prior-searches');
        var priorSearchesButton = $(`<button class="prior-search-items" id="search${searchItem}">${searchInput}</button>`);
    
        priorSearches.append(priorSearchesButton); 
    } else {
        return
    };
    acutalStoreInput();
};

function acutalStoreInput () {
    var searchItemClass1 = document.getElementById('search1')
    var searchItemClass2 = document.getElementById('search2')
    var searchItemClass3 = document.getElementById('search3')
    var searchItemClass4 = document.getElementById('search4')
    var searchItemClass5 = document.getElementById('search5')
    var searchItemClass6 = document.getElementById('search6')
    var searchItemClass7 = document.getElementById('search7')
    var searchItemClass8 = document.getElementById('search8')
    var searchItemClass9 = document.getElementById('search9')
    var searchItemClass10 = document.getElementById('search10')
    localStorage.setItem("search1", searchItemClass1.innerText);
    localStorage.setItem("search2", searchItemClass2.innerText);
    localStorage.setItem("search3", searchItemClass3.innerText);
    localStorage.setItem("search4", searchItemClass4.innerText);
    localStorage.setItem("search5", searchItemClass5.innerText);
    localStorage.setItem("search6", searchItemClass6.innerText);
    localStorage.setItem("search7", searchItemClass7.innerText);
    localStorage.setItem("search8", searchItemClass8.innerText);
    localStorage.setItem("search9", searchItemClass9.innerText);
    localStorage.setItem("search10", searchItemClass10.innerText);

};

function loadSaved () {
    var priorSearches = $('#prior-searches');
    search1 = localStorage.getItem('search1')
    search2 = localStorage.getItem('search2');
    search3 = localStorage.getItem('search3');
    search4 = localStorage.getItem('search4');
    search5 = localStorage.getItem('search5');
    search6 = localStorage.getItem('search6');
    search7 = localStorage.getItem('search7');
    search8 = localStorage.getItem('search8');
    search9 = localStorage.getItem('search9');
    search10 = localStorage.getItem('search10');

    if (search1 !== null){
        // var search1Key = localStorage.key('search1')
    var priorSearchesButton = $(`<button class="prior-search-items" id="search1">${search1}</button>`);
    priorSearches.append(priorSearchesButton);
    };

    if (search2 !== null){
        // var search2Key = localStorage.key('search2')
        var priorSearchesButton = $(`<button class="prior-search-items" id="search2">${search2}</button>`);
        priorSearches.append(priorSearchesButton);
    };

    if (search3 !== null){
        // var search2Key = localStorage.key('search2')
        var priorSearchesButton = $(`<button class="prior-search-items" id="search3">${search3}</button>`);
        priorSearches.append(priorSearchesButton);
    };

    if (search4 !== null){
        // var search2Key = localStorage.key('search2')
        var priorSearchesButton = $(`<button class="prior-search-items" id="search4">${search4}</button>`);
        priorSearches.append(priorSearchesButton);
    };

    if (search5 !== null){
        // var search2Key = localStorage.key('search2')
        var priorSearchesButton = $(`<button class="prior-search-items" id="search5">${search5}</button>`);
        priorSearches.append(priorSearchesButton);
    };

    if (search6 !== null){
        // var search2Key = localStorage.key('search2')
        var priorSearchesButton = $(`<button class="prior-search-items" id="search6">${search6}</button>`);
        priorSearches.append(priorSearchesButton);
    };

    if (search7 !== null){
        // var search2Key = localStorage.key('search2')
        var priorSearchesButton = $(`<button class="prior-search-items" id="search7">${search7}</button>`);
        priorSearches.append(priorSearchesButton);
    };

    if (search8 !== null){
        // var search2Key = localStorage.key('search2')
        var priorSearchesButton = $(`<button class="prior-search-items" id="search8">${search8}</button>`);
        priorSearches.append(priorSearchesButton);
    };

    if (search9 !== null){
        // var search2Key = localStorage.key('search2')
        var priorSearchesButton = $(`<button class="prior-search-items" id="search9">${search9}</button>`);
        priorSearches.append(priorSearchesButton);
    };

    if (search10 !== null){
        // var search2Key = localStorage.key('search2')
        var priorSearchesButton = $(`<button class="prior-search-items" id="search10">${search10}</button>`);
        priorSearches.append(priorSearchesButton);
    } else {
        return
    };

    // for (var i = 0; i < localStorage.length; i++) {
    //     console.log(localStorage.getItem(localStorage.key(i)));
    //   }
    // // var search1Val = localStorage.getItem('search1').value;

    

    // document.getElementById('9AM').textContent = localStorage.getItem('text1');
    // if ('text1' == null) {
    //   document.getElementById('9AM').textContent = null;
    // }
};


// function getStoredInput
// taking local storage and creating an if statement.

searchButton.on('click', function () {
    searchInputField();
    if (forecastCards = !undefined){
        fiveDayCards.empty()
    }
    // console.log(inputBox.val())
});



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