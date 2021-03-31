var apiKey = "69ad040071c6bd9e0fba40e9e25eb461";
var searchBtn = document.querySelector("#search-button");
var cityName = " ";
var currentCityName = document.querySelector("#city-name");
var currentCityTemp = document.querySelector("#c-temp");
var currentCityHumidity = document.querySelector("#c-humi");
var currentCityWindSpeed = document.querySelector("#c-ws");
var currentCityUV = document.querySelector("#c-uv");
var currentDay = document.querySelector("#c-day");
var iconCurrent = document.querySelector("#icon");
var currentCityArray = JSON.parse(localStorage.getItem("cities")) || [];
var forecastSection = document.querySelector("#forecast-div");
var searchHistory = document.querySelector("#searchHistory");
var clearButton = document.querySelector("#clearBtn");
var searchedCity = document.querySelector(".searched-city");
var foreCastHeader = document.querySelector("#current-city-name");

//Hide Forecast Section on Page Load
window.onload = function () {
  forecastSection.style.display = "none";
  foreCastHeader.style.display = "none";
};

// Search city
function searchCity() {
  cityName = document.getElementById("search-field").value;
  getCityWeatherInfo(cityName);
  getForecast(cityName);
  currentCityName;
}

// Get Current Weather Data API
function getCityWeatherInfo(cityName) {
  var requestUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=" +
    apiKey +
    "&units=imperial";
  fetch(requestUrl)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var currentTemp = data.main.temp;
      var currentCity = data.name;
      currentHumidity = data.main.humidity;
      currentWindSpeed = data.wind.speed;
      icon = data.weather[0].icon;
      iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      var currentDay = data.dt;
      currentDay = moment().format("L");
      currentCityName.innerHTML = currentCity;
      currentCityTemp.innerHTML = currentTemp + "&deg" + "F";
      currentCityHumidity.innerHTML = currentHumidity + "%";
      currentCityWindSpeed.innerHTML = currentWindSpeed;
      currentDay.innerHTML = currentDay;
      iconCurrent.innerHTML = "<img src=" + iconUrl + ">";
      currentCityUV.innerHTML = "coming soon!!!!";

      // Set City Name to city Array
      currentCityArray.push(currentCity);
      localStorage.setItem("City", currentCity);
      localStorage.setItem("cities", JSON.stringify(currentCityArray));
    });
  // Show forecast section after a city has been searched
  forecastSection.style.display = "block";
  foreCastHeader.style.display = "block";
}
// Get 5 Day/ 3 hour forecast
function getForecast(cityName) {
  var requestUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityName +
    "&appid=" +
    apiKey +
    "&units=imperial";
  fetch(requestUrl)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      for (var i = 0; i < data.list.length; i += 8) {
        futureDay = data.list[i].dt;
        futureTemp = JSON.stringify(data.list[i].main.temp);
        futureHumid = JSON.stringify(data.list[i].main.humidity);
        futureDay = moment.unix(futureDay).format("L");
        futureDayIcon = data.list[i].weather[0].icon;
        futureDayUrl =
          "http://openweathermap.org/img/wn/" + futureDayIcon + "@2x.png";

        $(`
          <div class="custom-card">
            <p>${futureDay}</p>
            <p><img src="${futureDayUrl}"></p>
            <p>Temperature: ${futureTemp}&deg;F</p>
            <p>Humidity: ${futureHumid}%</p>
          </div>
        `).appendTo("#forecast-div");
      }

      //displayWeatherInfo();
    });
}

// This function is not needed
/* function displayWeatherInfo() {
  currentCityName.innerHTML = localStorage.getItem("City");
  currentCityTemp.innerHTML =
  localStorage.getItem("Temperature") + "&deg" + "F";
  currentCityHumidity.innerHTML = localStorage.getItem("Humidity") + "%";
  currentCityWindSpeed.innerHTML = localStorage.getItem("Wind Speed");
  currentDay.innerHTML = localStorage.getItem("Current Day");
  iconVal = localStorage.getItem("Icon");
} */

/* Display previously search cities and make call to show data*/
function displaySearchHistory() {
  for (var i = 0; i < currentCityArray.length; i++) {
    var searchCity = currentCityArray[i];
    $(`
          <div class="searched-city">
            <p>${searchCity}</p>
          </div>
        `).appendTo("#searchHistory");
  }
}

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  searchCity();
  $("#search-field").val("");
  displaySearchHistory();
  // clear div of previous five day search
  $("#forecast-div").empty();
});

// This function clears local storage
clearButton.addEventListener("click", function () {
  localStorage.clear();
  searchHistory.style.display = "none";
  // currentCityArray.splice(0, currentCityArray.length);
});

// This function recalls the 2 forecast functions
$(searchHistory).click(function (e) {
  console.log("button clicked");
  var buttonLabel = e.target.textContent;
  var newInput = buttonLabel.trim();
  console.log(newInput);
  getCityWeatherInfo(newInput);
  getForecast(newInput);
  $("#forecast-div").empty();
});
