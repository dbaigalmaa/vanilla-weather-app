function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let weatherDesc = document.querySelector("#weather-desc");
  let windElement = document.querySelector("#wind");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  weatherDesc.innerHTML = response.data.weather[0].main;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  console.log(response.data);

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
}

let apiKey = "7f74d00955f9d04bcd04016edb71bf36";
let city = "San Francisco";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);
