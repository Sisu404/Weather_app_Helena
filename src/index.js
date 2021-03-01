//TIME
function showTime() {
let now = new Date();
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
    hours = `0${hours}`;
  } 
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
  } 
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
let currentTime = document.querySelector("#currentTime");
  currentTime.innerHTML = `${day} ${hours}:${minutes}, ${month} ${date}, ${now.getFullYear()}`;
}
showTime();

//for weather api
const apiKey = "e87046c6d26de6ef81b6cae3b1026199";
const units = "metric";
const apiUrl = `https://api.openweathermap.org/data/2.5/`;
const searchInput = document.querySelector("#search-text-input");

//For searching weather based on city name 
function updateCity(event) {
  event.preventDefault();
  console.log(searchInput.value);
  let apiUrlCityToday = `weather?q=`;
  axios
    .get(
      `${apiUrl}${apiUrlCityToday}${searchInput.value}&units=${units}&appid=${apiKey}`
    )
    .then(showWeather);
  let apiUrlCityForecast = `forecast?q=`;
  axios
    .get(
      `${apiUrl}${apiUrlCityForecast}${searchInput.value}&units=${units}&appid=${apiKey}`
    )
    .then(showForecast);
}
const form = document.querySelector("form");
form.addEventListener("submit", updateCity);

//For searching weather based on the coordinates
function searchCoordinates(position) {
  const currentLat = position.coords.latitude;
  const currentLon = position.coords.longitude;
  let apiUrlCoordsToday = `weather?`;
  axios
    .get(
      `${apiUrl}${apiUrlCoordsToday}lat=${currentLat}&lon=${currentLon}&units=${units}&appid=${apiKey}`
    )
    .then(showWeather);
let apiUrlCoordsForecast = `forecast?`;
  axios
    .get(
      `${apiUrl}${apiUrlCoordsForecast}lat=${currentLat}&lon=${currentLon}&units=${units}&appid=${apiKey}`
    ).then(showForecast); 
}

//for defining the coordinates
function locateCoordinates() {
  navigator.geolocation.getCurrentPosition(searchCoordinates);
}

let button = document.querySelector("#locateButton");
button.addEventListener("click", locateCoordinates);

//to show the current weather
function showWeather(response) {
  let currentTempElement = document.querySelector("#currentTemperature");
  let currentTempMax = Math.round(response.data.main.temp_max);
  let currentTempMin = Math.round(response.data.main.temp_min);
  let currentTempMaxMinElement = document.querySelector("#currentTempMaxMin");
  const weatherMainly = document.querySelector("#weatherMainly");
  let weatherIconCodeToday = response.data.weather[0].icon;
  let weatherIconToday = document.querySelector("#currentWeatherIcon");
  let currentLocation = document.querySelector("#currentLocation");
  let currentHumidity = document.querySelector("#currentHumidity");
  let currentWind = document.querySelector("#currentWind");

  celsiusTemperature = (response.data.main.temp);
  currentTempElement.innerHTML = Math.round(celsiusTemperature);
  currentTempMaxMinElement.innerHTML = `Max: ${currentTempMax}&degC Min: ${currentTempMin}&degC`;
  weatherIconToday.setAttribute("src",`http://openweathermap.org/img/wn/${weatherIconCodeToday}@2x.png`);
  weatherIconToday.setAttribute("alt", response.data.weather[0].description);
  weatherMainly.innerHTML = `${response.data.weather[0].main}`;
  currentLocation.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  currentHumidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
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
  console.log(response.data.list[0].main.temp_max);
  console.log(response.data.list[0].main.temp_min);
  console.log(response.data.list[0].weather[0].main);
  tomorrow.innerHTML = days[now.getDay() + 1] + ` ` + (now.getDate() + 1);
  secondDay.innerHTML = days[now.getDay() + 2] + ` ` + (now.getDate() + 2);
  thirdDay.innerHTML = days[now.getDay() + 3] + ` ` + (now.getDate() + 3);
  fourthDay.innerHTML = days[now.getDay() + 4] + ` ` + (now.getDate() + 4);
  fifthDay.innerHTML = days[now.getDay() + 5] + ` ` + (now.getDate() + 5);
}

function convertFahrenheitTemperature(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#currentTemperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = celsiusTemperature * 1.8 + 32;
  currentTemperature.innerHTML = Math.round(fahrenheitTemperature);
}

function convertCelsiusTemperature(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#currentTemperature");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  currentTemperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertCelsiusTemperature);