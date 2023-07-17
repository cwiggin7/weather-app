/* eslint-disable linebreak-style */
/* eslint-disable camelcase */

const apiKey = "07ad528bf198493aaa615753231207";

const searchBarElement = document.getElementById("search-bar");

const conditionElement = document.getElementById("weather-condition");
const locationElement = document.getElementById("location");
const temperatureElement = document.getElementById("temperature-fahrenheit");

const feelsLikeElement = document.getElementById("feels-like-fahrenheit");
const humidityElement = document.getElementById("humidity");
const windElement = document.getElementById("wind-mph");

function updateWeatherUI(weatherData) {
  const { text, feelslike_f, humidity, temp_f, wind_mph, name, region } =
    weatherData;

  conditionElement.innerText = text;
  locationElement.innerText = `${name.toUpperCase()}, ${region.toUpperCase()}`;
  temperatureElement.innerText = Math.round(temp_f);

  feelsLikeElement.innerText = Math.round(feelslike_f);
  humidityElement.innerText = humidity;
  windElement.innerText = wind_mph;
}

function weatherFactory(
  text,
  feelslike_f,
  humidity,
  temp_f,
  wind_mph,
  name,
  region,
) {
  return {
    text,
    feelslike_f,
    humidity,
    temp_f,
    wind_mph,
    name,
    region,
  };
}

function fetchWeather(location) {
  fetch(
    `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&days=7`,
    { mode: "cors" },
  )
    .then((response) => response.json())
    .then((response) => {
      const {
        condition: { text },
        feelslike_f,
        humidity,
        temp_f,
        wind_mph,
      } = response.current;

      const { name, region } = response.location;

      const weatherData = weatherFactory(
        text,
        feelslike_f,
        humidity,
        temp_f,
        wind_mph,
        name,
        region,
      );

      updateWeatherUI(weatherData);
    });
}

function handleWeatherSearch(event) {
  event.preventDefault();
  fetchWeather(searchBarElement.value);
  searchBarElement.value = "";
}

document.addEventListener("DOMContentLoaded", () => {
  fetchWeather("Kansas");
});
