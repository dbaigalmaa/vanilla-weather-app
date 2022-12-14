function formatDate(timestamp) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDate = new Date(timestamp);
  let day = days[currentDate.getDay()];
  let hour = currentDate.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = currentDate.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  return `${day} ${hour}:${minute}`;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");

  let forecastDays = response.data.daily;
  let forecastHTML = `<div class="row">`;
  forecastDays.forEach(function (day, index) {
    if (index < 5) {
      let tempMax = Math.round(day.temperature.maximum);
      let tempMin = Math.round(day.temperature.minimum);
      let iconUrl = day.condition.icon_url;
      let iconAlt = day.condition.icon;
      let dayForecast = formatDate(day.time * 1000).substring(0, 3);
      forecastHTML =
        forecastHTML +
        `<div class="col">
              <div class="forecast-date">${dayForecast}</div>
              <img
                src=${iconUrl}
                alt=${iconAlt}
                width="46"
              />
              <div class="forecast-temp">
                <span class="forectas-temp-max">${tempMax}°</span>
                <span class="forecast-temp-min">${tempMin}°</span>
              </div>
            </div>`;
    }
  });

  forecastElement.innerHTML = forecastHTML + `</div>`;
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let weatherDesc = document.querySelector("#weather-desc");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let humidityElement = document.querySelector("#humidity");
  let iconElement = document.querySelector("#icon");

  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  weatherDesc.innerHTML = response.data.condition.description;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = response.data.temperature.humidity;
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  iconElement.setAttribute("alt", response.data.condition.description);
  iconElement.setAttribute("src", response.data.condition.icon_url);
}

function search(city, unit) {
  let apiKey = "acab64483d142d2af0b5de09tad9fo2f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${unit}`;
  let apiForecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayTemperature);
  axios.get(apiForecastUrl).then(displayForecast);
}
function handleSubmit(event) {
  event.preventDefault();
  cityInput = document.querySelector("#city-input").value;
  search(cityInput, "metric");
  fahrLink.classList.remove("active");
  celsLink.classList.add("active");
}

function displayFahr(event) {
  event.preventDefault();
  let windUnit = document.querySelector("#wind-unit");
  windUnit.innerHTML = " mph";
  search(cityInput, "imperial");
  fahrLink.classList.add("active");
  celsLink.classList.remove("active");
}
function displayCels(event) {
  event.preventDefault();
  let windUnit = document.querySelector("#wind-unit");
  windUnit.innerHTML = " km/h";
  search(cityInput, "metric");
  fahrLink.classList.remove("active");
  celsLink.classList.add("active");
}

let cityInput = "Paris";
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrLink = document.querySelector("#fahr-link");
fahrLink.addEventListener("click", displayFahr);
let celsLink = document.querySelector("#cels-link");
celsLink.addEventListener("click", displayCels);

search(cityInput, "metric");
