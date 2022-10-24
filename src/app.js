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

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let weatherDesc = document.querySelector("#weather-desc");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let humidityElement = document.querySelector("#humidity");
  let iconElement = document.querySelector("#icon");

  cels = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  weatherDesc.innerHTML = response.data.condition.description;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = response.data.temperature.humidity;
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  iconElement.setAttribute("alt", response.data.condition.description);
  iconElement.setAttribute("src", response.data.condition.icon_url);
}

function search(city) {
  let apiKey = "acab64483d142d2af0b5de09tad9fo2f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}

function displayFahr(event) {
  event.preventDefault();
  let temp = document.querySelector("#temperature");
  let fahr = (cels * 9) / 5 + 32;
  temp.innerHTML = Math.round(fahr);
  fahrLink.classList.add("active");
  celsLink.classList.remove("active");
}
function displayCels(event) {
  event.preventDefault();
  let temp = document.querySelector("#temperature");
  temp.innerHTML = Math.round(cels);
  fahrLink.classList.remove("active");
  celsLink.classList.add("active");
}

let cels = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrLink = document.querySelector("#fahr-link");
fahrLink.addEventListener("click", displayFahr);
let celsLink = document.querySelector("#cels-link");
celsLink.addEventListener("click", displayCels);

search("Paris");
