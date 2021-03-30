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
var searchedCity = document.querySelector("#searched-city");
var foreCastHeader = document.querySelector("#current-city-name");

window.onload = function () {
  forecastSection.style.display = "none";
  foreCastHeader.style.display = "none";
};

// Search city
function searchCity() {
  cityName = document.getElementById("search-field").value;
  //console.log(cityName);
  getCityWeatherInfo(cityName);
  getForecast(cityName);
  currentCityName;
}

// Fetch weather information from API
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
      console.log(currentCity);
      currentHumidity = data.main.humidity;
      currentWindSpeed = data.wind.speed;
      currentWindSpeed = data.wind.speed;
      icon = data.weather[0].icon;
      iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      console.log(iconUrl);
      console.log("icon");
      console.log("The current UV Index " + currentWindSpeed);
      var currentDay = data.dt;
      currentDay = moment().format("L");
      console.log("icon " + icon);

      // Set City Name to city Array
      currentCityArray.push(currentCity);
      localStorage.setItem("City", currentCity);
      localStorage.setItem("Temperature", currentTemp);
      localStorage.setItem("Humidity", currentHumidity);
      localStorage.setItem("Wind Speed", currentWindSpeed);
      localStorage.setItem("Current Day", currentDay);
      localStorage.setItem("Icon", icon);
      localStorage.setItem("cities", JSON.stringify(currentCityArray));
      iconCurrent.innerHTML = "<img src=" + iconUrl + ">";
    });
  displayWeatherInfo();
  forecastSection.style.display = "block";
}
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
        console.log("The day is " + futureDay);
        console.log("The Temp is " + futureTemp);
        console.log("The Humidity is " + futureHumid);
        console.log("Future Icon" + futureDayUrl);
        length,
          $(`
          <div class="custom-card">
            <p>${futureDay}</p>
            <p><img src="${futureDayUrl}"></p>
            <p>Temperature: ${futureTemp}&deg;F</p>
            <p>Humidity: ${futureHumid}%</p>
          </div>
        `).appendTo("#forecast-div");
      }
      displayWeatherInfo();
    });
}
// Display Weather Back to User
function displayWeatherInfo() {
  currentCityName.innerHTML = localStorage.getItem("City");
  currentCityTemp.innerHTML =
    localStorage.getItem("Temperature") + "&deg" + "F";
  currentCityHumidity.innerHTML = localStorage.getItem("Humidity") + "%";
  currentCityWindSpeed.innerHTML = localStorage.getItem("Wind Speed");
  currentDay.innerHTML = localStorage.getItem("Current Day");
  //iconVal = localStorage.getItem("Icon");
}
// Store weather information to local storage
function storeWeatherInfo() {}
// Show search history
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
//searchCity();
//searchBtn.addEventListener("click", searchCity);
searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  searchCity();
  document.getElementById("search-field").value = " ";
  displaySearchHistory();
  // clear div of previous five day search
  $("#forecast-div").empty();
});
clearButton.addEventListener("click", function () {
  localStorage.clear();
  searchHistory.style.display = "none";
});
searchedCity.addEventListener("click", function (e) {
  e.preventDefault();
  searchCity();
});
