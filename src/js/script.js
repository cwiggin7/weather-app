import apiKey from "../../config/secrets.js";

const searchBar = document.getElementById("search-bar");
const conditionElement = document.getElementById("condition");
const cityRegionElement = document.getElementById("city-region");
const temperatureElement = document.getElementById("temperature");
const feelsLikeElement = document.getElementById("feels-like");
const windMPHElement = document.getElementById("wind-mph");
const humidityElement = document.getElementById("humidity");

function weatherFactory(
  city,
  region,
  temperatureFahrenheit,
  condition,
  feelsLikeFahrenheit,
  humidity,
  windSpeedMph,
) {
  return {
    city,
    region,
    temperatureFahrenheit: Math.round(temperatureFahrenheit),
    condition,
    feelsLikeFahrenheit: Math.round(feelsLikeFahrenheit),
    humidity: Math.round(humidity),
    windSpeedMph: Math.round(windSpeedMph),
  };
}

function fetchWeather(city) {
  const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((response) => {
      const { name } = response.location;
      const { region } = response.location;

      const { text } = response.current.condition;
      const { temp_f } = response.current;
      const { feelslike_f } = response.current;
      const { humidity } = response.current;
      const { wind_mph } = response.current;
      const weatherData = weatherFactory(
        name,
        region,
        temp_f,
        text,
        feelslike_f,
        humidity,
        wind_mph,
      );

      conditionElement.innerText = weatherData.condition;
      cityRegionElement.innerText = `${weatherData.city.toUpperCase()}, ${weatherData.region.toUpperCase()}`;
      temperatureElement.innerText = weatherData.temperatureFahrenheit;
      feelsLikeElement.innerText = `FEELS LIKE: ${weatherData.feelsLikeFahrenheit}`;
      windMPHElement.innerText = `WIND: ${weatherData.windSpeedMph} MPH`;
      humidityElement.innerText = `HUMIDITY: ${weatherData.humidity}%`;
    });
}

function submitForm(event) {
  event.preventDefault();
  fetchWeather(searchBar.value);
}

document.addEventListener("DOMContentLoaded", () => {
  fetchWeather("Kansas City");
  document.querySelector("form").addEventListener("submit", submitForm);
  document.querySelector("a").addEventListener("click", submitForm);
});
