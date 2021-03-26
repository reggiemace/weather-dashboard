var apiKey = "69ad040071c6bd9e0fba40e9e25eb461";
var searchBtn = document.querySelector("#search-button");
var cityName = " ";
var currentCityName = document.querySelector("#city-name");
var currentCityTemp = document.querySelector("#c-temp");
var currentCityHumidity = document.querySelector("#c-humi");
var currentCityWindSpeed = document.querySelector("#c-ws");
var currentCityUV = document.querySelector("#c-uv");
var currentDay = document.querySelector("#c-day");
var icon = "";
var currentCityArray = [];

// Search city
function searchCity() {
  cityName = document.getElementById("search-field").value;
  //console.log(cityName);
  getCityWeatherInfo(cityName);
  getForecast(cityName);
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
      icon = data.weather.icon;
      console.log("The current UV Index " + currentWindSpeed);
      var currentDay = data.dt;
      currentDay = moment().format("L");
      console.log(currentDay);

      currentCityArray.push(
        currentCity,
        currentTemp,
        currentHumidity,
        currentWindSpeed,
        currentDay
      );

      localStorage.setItem("City", currentCity);
      localStorage.setItem("Temperature", currentTemp);
      localStorage.setItem("Humidity", currentHumidity);
      localStorage.setItem("Wind Speed", currentWindSpeed);
      localStorage.setItem("Current Day", currentDay);
      localStorage.setItem("Icon", icon);
    });
  displayWeatherInfo();
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
      console.log(data);
      console.log(data.list.length);
      console.log(data.city);
      console.log(data.city.name);

      for (var i = 0; i < data.list.length; i++) {
        futureDay = data.list[i].dt;
        futureTemp = JSON.stringify(data.list[i].main.temp);
        futureHumid = JSON.stringify(data.list[i].main.humidity);
        futureDay = moment().format("'MMMM Do YYYY, h:mm:ss a'");
        console.log("The day is " + futureDay);
        console.log("The Temp is " + futureTemp);
        console.log("The Humidity is " + futureHumid);

        localStorage.setItem = ("Days", JSON.stringify(data.list[i].dt));
      }
    });
}
// Display Weather Back to User
function displayWeatherInfo() {
  currentCityName.textContent = localStorage.getItem("City");
  currentCityTemp.textContent = localStorage.getItem("Temperature");
  currentCityHumidity.textContent = localStorage.getItem("Humidity");
  currentCityWindSpeed.textContent = localStorage.getItem("Wind Speed");
  currentDay.textContent = localStorage.getItem("Current Day");
  //icon.value = localStorage.getItem("Icon");
}
// Store weather information to local storage
function storeWeatherInfo() {}
// Show search history
function displaySearchHistory() {}
//searchCity();
//searchBtn.addEventListener("click", searchCity);
searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  searchCity();
});
