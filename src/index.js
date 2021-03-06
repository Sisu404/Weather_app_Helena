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
let weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let weekday = weekdays[now.getDay()];
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
  currentTime.innerHTML = `${weekday} ${hours}:${minutes}, ${month} ${date}, ${now.getFullYear()}`;
}
showTime();

function getWeekdays(startDate, daysToAdd) {
    const aryWeekdays = [];

    for(let i = 0; i <= daysToAdd; i++) {
        let currentDate = new Date();
        currentDate.setDate(startDate.getDate() + i);
        aryWeekdays.push(dayAsString(currentDate.getDay()));
    }
    return aryWeekdays;
}

function dayAsString(dayIndex) {
    let weekdays = new Array(7);
    weekdays[0] = "Sunday";
    weekdays[1] = "Monday";
    weekdays[2] = "Tuesday";
    weekdays[3] = "Wednesday";
    weekdays[4] = "Thursday";
    weekdays[5] = "Friday";
    weekdays[6] = "Saturday";
    
    return weekdays[dayIndex];
}

let startDate = new Date();
const aryWeekdays = getWeekdays(startDate, 6);

//for weather api
const apiKey = "e87046c6d26de6ef81b6cae3b1026199";
const units = "metric";
const apiUrl = `https://api.openweathermap.org/data/2.5/`;


//For searching city coords based on input value 
function findCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  console.log(searchInput.value);
  let apiUrlCityToday = `weather?q=`;
  axios
    .get(
      `${apiUrl}${apiUrlCityToday}${searchInput.value}&units=${units}&appid=${apiKey}`
    )
    .then(showCoords); 
 
}
const form = document.querySelector("form");
form.addEventListener("submit", findCity);



//For fetching data after locating
function showCoords(response) {
  console.log(response.data.coord);
  let searchInput = document.querySelector("#search-text-input");
  let cityLat = response.data.coord.lat;
  let cityLon = response.data.coord.lon;
  let apiUrlCityToday = `weather?q=`;
  axios
    .get(
      `${apiUrl}${apiUrlCityToday}${searchInput.value}&units=${units}&appid=${apiKey}`
    )
    .then(showWeather); 
let apiUrlCoordsForecast = `onecall?`;
  axios
    .get(
      `${apiUrl}${apiUrlCoordsForecast}lat=${cityLat}&lon=${cityLon}&units=${units}&exclude=hourly,minutely&appid=${apiKey}`
    ).then(showForecast); 
}

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
let apiUrlCoordsForecast = `onecall?`;
  axios
    .get(
      `${apiUrl}${apiUrlCoordsForecast}lat=${currentLat}&lon=${currentLon}&units=${units}&exclude=hourly,minutely&appid=${apiKey}`
    ).then(showForecast); 
}


//for defining the coordinates
function locateCoordinates() {
  navigator.geolocation.getCurrentPosition(searchCoordinates);

}

let locateButton = document.querySelector("#locateButton");
locateButton.addEventListener("click", locateCoordinates);
locateButton.addEventListener("click", clearSearchField);


function clearSearchField() {
let searchInput = document.getElementById("form");
searchInput = "";
}


//for current weather
let currentTempElement = document.querySelector("#currentTemperature");
let currentTempMaxMinElement = document.querySelector("#currentTempMaxMin");

//to show the current weather
function showWeather(response) {
  let weatherMainly = document.querySelector("#weatherMainly");
  let weatherIconCodeToday = response.data.weather[0].icon;
  let weatherIconToday = document.querySelector("#currentWeatherIcon");
  let currentLocation = document.querySelector("#currentLocation");
  let currentHumidity = document.querySelector("#currentHumidity");
  let currentWind = document.querySelector("#currentWind");

  celsiusTemperature = (response.data.main.temp);
  celsiusCurrentTempMax = (response.data.main.temp_max);
  celsiusCurrentTempMin = (response.data.main.temp_min);
  currentTempElement.innerHTML = Math.round(celsiusTemperature);
  currentTempMaxMinElement.innerHTML = "Max: " + Math.round(celsiusCurrentTempMax) + " " + "Min: " + Math.round(celsiusCurrentTempMin) ;
  weatherIconToday.setAttribute("src",`http://openweathermap.org/img/wn/${weatherIconCodeToday}@2x.png`);
  weatherIconToday.setAttribute("alt", response.data.weather[0].description);
  weatherMainly.innerHTML = `${response.data.weather[0].main}`;
  currentLocation.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  currentHumidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  currentWind.innerHTML = `Wind: ${response.data.wind.speed} m/s`;
}
//FOR FORECAST
let tomorrow = document.querySelector("#firstDate");
let dayAfterTomorrow = document.querySelector("#secondDate");
let thirdDay = document.querySelector("#thirdDate");
let fourthDay = document.querySelector("#fourthDate");
let fifthDay = document.querySelector("#fifthDate");

let firstDayMaxElement = document.querySelector("#firstMax");
let firstDayMinElement = document.querySelector("#firstMin");
let firstWeatherIcon = document.querySelector("#firstWeatherIcon");
let secondDayMaxElement = document.querySelector("#secondMax");
let secondDayMinElement = document.querySelector("#secondMin");
let secondWeatherIcon = document.querySelector("#secondWeatherIcon");
let thirdDayMaxElement = document.querySelector("#thirdMax");
let thirdDayMinElement = document.querySelector("#thirdMin");
let thirdWeatherIcon = document.querySelector("#thirdWeatherIcon");
let fourthDayMaxElement = document.querySelector("#fourthMax");
let fourthDayMinElement = document.querySelector("#fourthMin");
let fourthWeatherIcon = document.querySelector("#fourthWeatherIcon");
let fifthDayMaxElement = document.querySelector("#fifthMax");
let fifthDayMinElement = document.querySelector("#fifthMin");
let fifthWeatherIcon = document.querySelector("#fifthWeatherIcon");

//to show weather forecast
function showForecast(response) {
  let firstWeatherIconCode = response.data.daily[0].weather[0].icon;
  let secondWeatherIconCode = response.data.daily[1].weather[0].icon;
  let thirdWeatherIconCode = response.data.daily[2].weather[0].icon;
  let fourthWeatherIconCode = response.data.daily[3].weather[0].icon;
  let fifthWeatherIconCode = response.data.daily[4].weather[0].icon;
  
  tomorrow.innerHTML = aryWeekdays[1];
  firstDayCelsiusTempMax = (response.data.daily[0].temp.max);
  firstDayCelsiusTempMin = (response.data.daily[0].temp.min);
  firstDayMaxElement.innerHTML = "Max: " + Math.round(firstDayCelsiusTempMax) + " ";
  firstDayMinElement.innerHTML = "Min: " + Math.round(firstDayCelsiusTempMin);
  firstWeatherIcon.setAttribute("src",`http://openweathermap.org/img/wn/${firstWeatherIconCode}@2x.png`);
  firstWeatherIcon.setAttribute("alt", response.data.daily[0].weather[0].description);

  dayAfterTomorrow.innerHTML = aryWeekdays[2];
  secondDayCelsiusTempMax = (response.data.daily[1].temp.max);
  secondDayCelsiusTempMin = (response.data.daily[1].temp.min);
  secondDayMaxElement.innerHTML = "Max: " + Math.round(secondDayCelsiusTempMax);
  secondDayMinElement.innerHTML = "Min: " + Math.round(secondDayCelsiusTempMin);
  secondWeatherIcon.setAttribute("src",`http://openweathermap.org/img/wn/${secondWeatherIconCode}@2x.png`);
  secondWeatherIcon.setAttribute("alt", response.data.daily[1].weather[0].description);
  
  thirdDay.innerHTML = aryWeekdays[3];
  thirdDayCelsiusTempMax = (response.data.daily[2].temp.max);
  thirdDayCelsiusTempMin = (response.data.daily[2].temp.min);
  thirdDayMaxElement.innerHTML = "Max: " + Math.round(thirdDayCelsiusTempMax);
  thirdDayMinElement.innerHTML = "Min: " + Math.round(thirdDayCelsiusTempMin);
  thirdWeatherIcon.setAttribute("src",`http://openweathermap.org/img/wn/${thirdWeatherIconCode}@2x.png`);
  thirdWeatherIcon.setAttribute("alt", response.data.daily[2].weather[0].description);
  
  fourthDay.innerHTML = aryWeekdays[4];
  fourthDayCelsiusTempMax = (response.data.daily[3].temp.max);
  fourthDayCelsiusTempMin = (response.data.daily[3].temp.min);
  fourthDayMaxElement.innerHTML = "Max: " + Math.round(fourthDayCelsiusTempMax);
  fourthDayMinElement.innerHTML = "Min: " + Math.round(fourthDayCelsiusTempMin);
  fourthWeatherIcon.setAttribute("src",`http://openweathermap.org/img/wn/${fourthWeatherIconCode}@2x.png`);
  fourthWeatherIcon.setAttribute("alt", response.data.daily[3].weather[0].description);
  
  fifthDay.innerHTML = aryWeekdays[5];
  fifthDayCelsiusTempMax = (response.data.daily[4].temp.max);
  fifthDayCelsiusTempMin = (response.data.daily[4].temp.min);
  fifthDayMaxElement.innerHTML = "Max: " + Math.round(fifthDayCelsiusTempMax);
  fifthDayMinElement.innerHTML = "Min: " + Math.round(fifthDayCelsiusTempMin);
  fifthWeatherIcon.setAttribute("src",`http://openweathermap.org/img/wn/${fifthWeatherIconCode}@2x.png`);
  fifthWeatherIcon.setAttribute("alt", response.data.daily[4].weather[0].description);
}

//For converting current temperature and forecast into Fahrenheits and back
function convertFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = celsiusTemperature * 1.8 + 32;
  let fahrenheitTempMax = celsiusCurrentTempMax * 1.8 + 32;
  let fahrenheitTempMin = celsiusCurrentTempMin * 1.8 + 32;
  let firstDayfahrenheitTempMax = firstDayCelsiusTempMax * 1.8 + 32;
  let firstDayfahrenheitTempMin = firstDayCelsiusTempMin * 1.8 + 32;
  let secondDayFahrenheitTempMax = secondDayCelsiusTempMax * 1.8 + 32;
  let secondDayFahrenheitTempMin = secondDayCelsiusTempMin * 1.8 + 32;
  let thirdDayfahrenheitTempMax = thirdDayCelsiusTempMax * 1.8 + 32;
  let thirdDayfahrenheitTempMin = thirdDayCelsiusTempMin * 1.8 + 32;
  let fourthDayFahrenheitTempMax = fourthDayCelsiusTempMax * 1.8 + 32;
  let fourthDayFahrenheitTempMin = fourthDayCelsiusTempMin * 1.8 + 32;  
  let fifthDayFahrenheitTempMax = fifthDayCelsiusTempMax * 1.8 + 32;
  let fifthDayFahrenheitTempMin = fifthDayCelsiusTempMin * 1.8 + 32;

  currentTempElement.innerHTML = Math.round(fahrenheitTemperature);
  currentTempMaxElement.innerHTML = "Max:" + Math.round(fahrenheitTempMax);
  currentTempMinElement.innerHTML = "Min:"  + Math.round(fahrenheitTempMin);
  firstDayMaxElement.innerHTML = "Max: " + Math.round(firstDayfahrenheitTempMax);
  firstDayMinElement.innerHTML = "Min: " + Math.round(firstDayfahrenheitTempMin);
  secondDayMaxElement.innerHTML = "Max: " + Math.round(secondDayFahrenheitTempMax);
  secondDayMinElement.innerHTML = "Min: " + Math.round(secondDayFahrenheitTempMin);
  thirdDayMaxElement.innerHTML = "Max: " + Math.round(thirdDayfahrenheitTempMax);
  thirdDayMinElement.innerHTML = "Min: " + Math.round(thirdDayfahrenheitTempMin);
  fourthDayMaxElement.innerHTML = "Max: " + Math.round(fourthDayFahrenheitTempMax);
  fourthDayMinElement.innerHTML = "Min: " + Math.round(fourthDayFahrenheitTempMin);
  fifthDayMaxElement.innerHTML = "Max: " + Math.round(fifthDayFahrenheitTempMax);
  fifthDayMinElement.innerHTML = "Min: " + Math.round(fifthDayFahrenheitTempMin);
}

function convertCelsiusTemperature(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  currentTempElement.innerHTML = Math.round(celsiusTemperature);
  currentTempMaxElement.innerHTML = "Max:" + Math.round(celsiusCurrentTempMax);
  currentTempMinElement.innerHTML = "Min:"  + Math.round(celsiusCurrentTempMin);
  firstDayMaxElement.innerHTML = "Max: " + Math.round(firstDayCelsiusTempMax);
  firstDayMinElement.innerHTML = "Min: " + Math.round(firstDayCelsiusTempMin);
  secondDayMaxElement.innerHTML = "Max: " + Math.round(secondDayCelsiusTempMax);
  secondDayMinElement.innerHTML = "Min: " + Math.round(secondDayCelsiusTempMin);
  thirdDayMaxElement.innerHTML = "Max: " + Math.round(thirdDayCelsiusTempMax);
  thirdDayMinElement.innerHTML = "Min: " + Math.round(thirdDayCelsiusTempMin);
  fourthDayMaxElement.innerHTML = "Max: " + Math.round(fourthDayCelsiusTempMax);
  fourthDayMinElement.innerHTML = "Min: " + Math.round(fourthDayCelsiusTempMin);
  fifthDayMaxElement.innerHTML = "Max: " + Math.round(fifthDayCelsiusTempMax);
  fifthDayMinElement.innerHTML = "Min: " + Math.round(fifthDayCelsiusTempMin);
}

let celsiusTemperature = null;
let celsiusCurrentTempMax = null;
let celsiusCurrentTempMin = null;
let firstDayCelsiusTempMax = null;
let firstDayCelsiusTempMin = null;
let secondDayCelsiusTempMax = null;
let secondDayCelsiusTempMin = null;
let thirdDayCelsiusTempMax = null;
let thirdDayCelsiusTempMin = null;
let fourthDayCelsiusTempMax = null;
let fourthDayCelsiusTempMin = null;
let fifthDayCelsiusTempMax = null;
let fifthDayCelsiusTempMin = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertCelsiusTemperature);