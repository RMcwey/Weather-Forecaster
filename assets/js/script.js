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
var city;
var state;
var cityState;

let storedInputs = [];
let storedInputsnumber = -1;
let resultNum = 1;

let locationIcon = document.querySelector('.weather-icon');

getStoredLs();

function searchInputField () {
    searchInput = document.querySelector('input').value;
    var splitWords = searchInput.split(",");
    // console.log(splitWords)
    useSplitWords(splitWords);
}

function reloadPrevSearch (target0) {
    searchInput = target0
    console.log(searchInput);
    var splitWords = searchInput.split(",");
    useSplitWords(splitWords);
}

function useSplitWords(splitWords) {
    city = splitWords[0].replace(/,/g, '');
    state = splitWords[1];
    cityState = city + state
    // console.log(city);
    // console.log(state);
    requestUrlLatLon = `https://api.openweathermap.org/geo/1.0/direct?q=${city},${state},{US}&appid=925aacac62e7fb2f553876f1d65a3104`;
    fetchLonLat(requestUrlLatLon);
};

function fetchLonLat(requestUrlLatLon) {
    fetch(requestUrlLatLon)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        fetchedData = data
        // console.log(data);
        latlonFunc(fetchedData)
    });

};

function latlonFunc (fetchedData) {
    latitude = fetchedData[0].lat
    // console.log(latitude)
    longitude = fetchedData[0].lon
    // console.log(longitude)
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
    var icon = fetchedCurrentData.current.weather[0].icon;
    console.log(icon)
    // locationIcon.innerHTML = `<img src="./assets/icons/${icon}.png">;`;
    const unixTimestamp = fetchedCurrentData.current.dt
    // console.log(unixTimestamp)
    const event = new Date(unixTimestamp * 1000);
    // console.log(event)
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const humanDateFormat = event.toLocaleDateString(options)

    // console.log(humanDateFormat)
    cityH4.innerHTML = "Current Weather: " + cityState + " " + humanDateFormat + `<div class="weather-icon"><img src="./assets/icons/${icon}.png"></div>`;
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
        let icon = day.weather[0].icon;
        // console.log(cardNum)
        foreCast.push({humanDateFormatDay, tempMax, tempMin, forecastWind, forecastHumidity, icon})
    } 
    renderForecast(foreCast)
};
    function renderForecast(foreCast) {
        foreCast.forEach(function({humanDateFormatDay, tempMax, tempMin, forecastWind, forecastHumidity, icon}) {
        // var fiveDayCards = $('#five-day-cards');
        
        const forecastCards = 
        $(`<div class="card card col">
              <h6>${humanDateFormatDay}</h6>
              <div class="weather-icon"><img src="./assets/icons/${icon}.png"></div>
              <p>High: ${tempMax}</p>
              <p>Low: ${tempMin}</p>
              <p>Wind: ${forecastWind}</p>
              <p>Humidity: ${forecastHumidity}</p>
            </div>`)
        fiveDayCards.append(forecastCards)
        });

        storeInput();
    };

function storeInput () {
    // searchInput = document.querySelector('input').value;
    // let storedInputs = []
    if (storedInputs.length < 5) {
    storedInputs.push(searchInput);
    console.log(storedInputs)
    } else if (storedInputs.length >= 5) {
        storedInputsnumber++
        if (storedInputsnumber <= 5) {
        storedInputs.splice(storedInputsnumber,1, searchInput);
        console.log(storedInputs)
        } else {
            storedInputsnumber = -1
            storedInputs.splice(storedInputsnumber,1, searchInput);
            console.log(storedInputs)
        }
    }
    storeInputsInLs()
    createSearchedButtons();
}
function createSearchedButtons () {
    var priorSearches = $('#prior-searches');
    // for (i = 0; i < storedInputs.length; i++) {
    var priorSearchesButton = $(`<button class="prior-search-items">${searchInput}</button>`);
    var priorSearchesButtonEls = document.querySelectorAll('.prior-search-items');
    if (priorSearchesButtonEls.length <= 5) {
    priorSearches.append(priorSearchesButton)
    }
}

function storeInputsInLs (){
    localStorage.setItem("previousSearches", JSON.stringify(storedInputs));
    // 
       
}

function getStoredLs() { 
    var getPreviousSearches = JSON.parse(localStorage.getItem("previousSearches"))
    var priorSearches = $('#prior-searches');
    // var priorSearchesButtonEls = document.querySelectorAll('.prior-search-items');
    console.log(getPreviousSearches)
    if (getPreviousSearches !== null) {
        for (i = 0; i < getPreviousSearches.length; i++) {
        var priorSearchesButton = $(`<button class="prior-search-items">${getPreviousSearches[i]}</button>`);
        // if (priorSearchesButtonEls.length <= 5) {
            priorSearches.append(priorSearchesButton)
            // }
        }
    } else {
        return
    }
}; 

// var prevSearchButton = $('.prior-search-items')
// var priorSearches = $('#prior-searches');
// $(evt.target).text()
$('#prior-searches').click(function(evt) {
   var target0 = $(evt.target).text()
    console.log(target0);
    reloadPrevSearch(target0);
    if (forecastCards = !undefined){
        fiveDayCards.empty()
    }
});

searchButton.on('click', function () {
    searchInputField();
    if (forecastCards = !undefined){
        fiveDayCards.empty()
    }
    // console.log(inputBox.val())
})