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
  let currentTempMaxElement = document.querySelector("#currentTempMax");
  let currentTempMinElement = document.querySelector("#currentTempMin");
  const weatherMainly = document.querySelector("#weatherMainly");
  let weatherIconCodeToday = response.data.weather[0].icon;
  let weatherIconToday = document.querySelector("#currentWeatherIcon");
  let currentLocation = document.querySelector("#currentLocation");
  let currentHumidity = document.querySelector("#currentHumidity");
  let currentWind = document.querySelector("#currentWind");

  celsiusTemperature = (response.data.main.temp);
  celsiusCurrentTempMax = (response.data.main.temp_max);
  celsiusCurrentTempMin = (response.data.main.temp_min);
  currentTempElement.innerHTML = Math.round(celsiusTemperature);
  currentTempMaxElement.innerHTML = "Max: " + Math.round(celsiusCurrentTempMax);
  currentTempMinElement.innerHTML = "Min: " + Math.round(celsiusCurrentTempMin);
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
  console.log(response.data.list[1].main.temp_max);
  console.log(response.data.list[1].main.temp_min);
  console.log(response.data.list[1].weather[0].main);
  console.log(response.data.list[1].weather[0].icon);
  let firstDayMax = document.querySelector("#firstMax");
  let firstDayMin = document.querySelector("#firstMin");
  let firstWeatherIconCode = response.data.list[1].weather[0].icon;
  let firstWeatherIcon = document.querySelector("#firstWeatherIcon");
  firstDayMax.innerHTML = "Max: " + Math.round(response.data.list[1].main.temp_max);
  firstDayMin.innerHTML = "Min: " + Math.round(response.data.list[1].main.temp_min);
  firstWeatherIcon.setAttribute("src",`http://openweathermap.org/img/wn/${firstWeatherIconCode}@2x.png`);
  firstWeatherIcon.setAttribute("alt", response.data.list[1].weather[0].main);
  let secondDayMax = document.querySelector("#secondMax");
  let secondDayMin = document.querySelector("#secondMin");
  let secondWeatherIconCode = response.data.list[2].weather[0].icon;
  let secondWeatherIcon = document.querySelector("#secondWeatherIcon");
  secondDayMax.innerHTML = "Max: " + Math.round(response.data.list[2].main.temp_max);
  secondDayMin.innerHTML = "Min: " + Math.round(response.data.list[2].main.temp_min);
  secondWeatherIcon.setAttribute("src",`http://openweathermap.org/img/wn/${secondWeatherIconCode}@2x.png`);
  secondWeatherIcon.setAttribute("alt", response.data.list[2].weather[0].main);
  let thirdDayMax = document.querySelector("#thirdMax");
  let thirdDayMin = document.querySelector("#thirdMin");
  let thirdWeatherIconCode = response.data.list[3].weather[0].icon;
  let thirdWeatherIcon = document.querySelector("#thirdWeatherIcon");
  thirdDayMax.innerHTML = "Max: " + Math.round(response.data.list[3].main.temp_max);
  thirdDayMin.innerHTML = "Min: " + Math.round(response.data.list[3].main.temp_min);
  thirdWeatherIcon.setAttribute("src",`http://openweathermap.org/img/wn/${thirdWeatherIconCode}@2x.png`);
  thirdWeatherIcon.setAttribute("alt", response.data.list[3].weather[0].main);
  let fourthDayMax = document.querySelector("#fourthMax");
  let fourthDayMin = document.querySelector("#fourthMin");
  let fourthWeatherIconCode = response.data.list[4].weather[0].icon;
  let fourthWeatherIcon = document.querySelector("#fourthWeatherIcon");
  fourthDayMax.innerHTML = "Max: " + Math.round(response.data.list[4].main.temp_max);
  fourthDayMin.innerHTML = "Min: " + Math.round(response.data.list[4].main.temp_min);
  fourthWeatherIcon.setAttribute("src",`http://openweathermap.org/img/wn/${fourthWeatherIconCode}@2x.png`);
  fourthWeatherIcon.setAttribute("alt", response.data.list[4].weather[0].main);
  let fifthDayMax = document.querySelector("#fifthMax");
  let fifthDayMin = document.querySelector("#fifthMin");
  let fifthWeatherIconCode = response.data.list[5].weather[0].icon;
  let fifthWeatherIcon = document.querySelector("#fifthWeatherIcon");
  fifthDayMax.innerHTML = "Max: " + Math.round(response.data.list[5].main.temp_max);
  fifthDayMin.innerHTML = "Min: " + Math.round(response.data.list[5].main.temp_min);
  fifthWeatherIcon.setAttribute("src",`http://openweathermap.org/img/wn/${fifthWeatherIconCode}@2x.png`);
  fifthWeatherIcon.setAttribute("alt", response.data.list[5].weather[0].main);
  tomorrow.innerHTML = days[now.getDay() + 1] + ` ` + (now.getDate() + 1);
  secondDay.innerHTML = days[now.getDay() + 2] + ` ` + (now.getDate() + 2);
  thirdDay.innerHTML = days[now.getDay() + 3] + ` ` + (now.getDate() + 3);
  fourthDay.innerHTML = days[now.getDay() + 4] + ` ` + (now.getDate() + 4);
  fifthDay.innerHTML = days[now.getDay() + 5] + ` ` + (now.getDate() + 5);
}

function convertFahrenheitTemperature(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#currentTemperature");
  let currentTempMaxElement = document.querySelector("#currentTempMax");
  let currentTempMinElement = document.querySelector("#currentTempMin");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = celsiusTemperature * 1.8 + 32;
  let fahrenheitTempMax = celsiusCurrentTempMax * 1.8 + 32;
  let fahrenheitTempMin = celsiusCurrentTempMin * 1.8 + 32;
  currentTemperature.innerHTML = Math.round(fahrenheitTemperature);
  currentTempMaxElement.innerHTML = "Max:" + Math.round(fahrenheitTempMax);
  currentTempMinElement.innerHTML = "Min:"  + Math.round(fahrenheitTempMin);
}

function convertCelsiusTemperature(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#currentTemperature");
  let currentTempMaxElement = document.querySelector("#currentTempMax");
  let currentTempMinElement = document.querySelector("#currentTempMin");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  currentTemperature.innerHTML = Math.round(celsiusTemperature);
  currentTempMaxElement.innerHTML = "Max:" + Math.round(celsiusCurrentTempMax);
  currentTempMinElement.innerHTML = "Min:"  + Math.round(celsiusCurrentTempMin);
}

let celsiusTemperature = null;
let celsiusCurrentTempMax = null;
let celsiusCurrentTempMin = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertCelsiusTemperature);