//TIME
let now = new Date();
let date = now.getDate();
let hour = (`0`+now.getHours()).slice(-2);
let minutes = (`0`+now.getMinutes()).slice(-2);
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

let month = months[now.getMonth()];


  


function showTime() {
  let currentTime = document.querySelector("h4.currentTime");
  currentTime.innerHTML = `${day} ${hour}:${minutes}, ${month} ${date}, ${now.getFullYear()}`;
}
showTime();

//for weather api
const apiKey = "e87046c6d26de6ef81b6cae3b1026199";
const units = "metric";
const apiUrl = `https://api.openweathermap.org/data/2.5/`;
const searchInput = document.querySelector("#search-text-input");

//WHEN SEARCHING BY CITY NAME
function updateCity(event) {
  event.preventDefault();
  console.log(searchInput.value);
  let apiUrlCityToday = `weather?q=`;
  axios
    .get(
      `${apiUrl}${apiUrlCityToday}${searchInput.value}&units=${units}&appid=${apiKey}`
    )
    .then(showWeather);
}
const form = document.querySelector("form");
form.addEventListener("submit", updateCity);
form.addEventListener("submit", updateCityForecast);

//For searching the location based on the coordinates
function searchCoordinates(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let apiUrlCoordsToday = `weather?`;
  let currentLat = position.coords.latitude;
  let currentLon = position.coords.longitude;
  axios
    .get(
      `${apiUrl}${apiUrlCoordsToday}lat=${currentLat}&lon=${currentLon}&units=${units}&appid=${apiKey}`
    )
    .then(showWeather);
}

//for defining the coordinates
function locateCoordinates() {
  navigator.geolocation.getCurrentPosition(searchCoordinates);
}

let button = document.querySelector("#locateButton");
button.addEventListener("click", locateCoordinates);

//For forecast when searching by city name
function updateCityForecast(event) {
  event.preventDefault();
  console.log(searchInput.value);
  let days = `5`;
  axios
    .get(
      `${apiUrl}forecast/daily?q=${searchInput.value}&cnt=${days}&units=${units}&appid=${apiKey}`
    )
    .then(showForecast);
}

// TÄSTÄ POISTIN SÄÄENNUSTEEN KOORDINAATTIEN MUKAAN

//to show the current weather
function showWeather(response) {
  console.log(response.data.weather[0].main);
  console.log(response.data.name);
  console.log(response.data.main.temp);
  console.log(response.data.main.temp_max);
  console.log(response.data.main.temp_min);
  console.log(response.data.main.humidity);
  console.log(response.data.wind.speed);
  console.log(response.data.sys.country);
  let currentTemp = Math.round(response.data.main.temp);
  let currentTempElement = document.querySelector("h4.currentTemperature");
  currentTempElement.innerHTML = `${currentTemp}&degC`;
  let currentTempMax = Math.round(response.data.main.temp_max);
  let currentTempMin = Math.round(response.data.main.temp_min);
  let currentTempMaxMinElement = document.querySelector("h4.currentTempMaxMin");
  currentTempMaxMinElement.innerHTML = `Max: ${currentTempMax}&degC Min: ${currentTempMin}&degC`;
  let weatherMainly = document.querySelector("h4.weatherMainly");
  weatherMainly.innerHTML = `${response.data.weather[0].main}`;
  let currentLocation = document.querySelector("h4.currentLocation");
  currentLocation.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  let currentHumidity = document.querySelector("h4.currentHumidity");
  currentHumidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let currentWind = document.querySelector("h4.currentWind");
  currentWind.innerHTML = `Wind: ${response.data.wind.speed} m/s`;
}
//DAYS AND DATES FOR FORECAST
let tomorrow = document.querySelector("span.firstDay");
let secondDay = document.querySelector("#secondDay");
let thirdDay = document.querySelector("#thirdDay");
let fourthDay = document.querySelector("#fourthDay");
let fifthDay = document.querySelector("#fifthDay");

//For weather forecast
function showForecast(response) {
  console.log(response);
  tomorrow.innerHTML = days[now.getDay() + 1] + ` ` + (now.getDate() + 1);
  secondDay.innerHTML = days[now.getDay() + 2] + ` ` + (now.getDate() + 2);
  thirdDay.innerHTML = days[now.getDay() + 3] + ` ` + (now.getDate() + 3);
  fourthDay.innerHTML = days[now.getDay() + 4] + ` ` + (now.getDate() + 4);
  fifthDay.innerHTML = days[now.getDay() + 5] + ` ` + (now.getDate() + 5);
}
