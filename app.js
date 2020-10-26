/*
  - Fetch relevant weather data from API
  - Display needed data in app
  TODO:
  - Collect query from client
  - Use that query to fetch weather data from API
*/

const api = {
  key: 'd016cab48add956f0ee8964c413d6dd3',
  url: 'https://api.openweathermap.org/data/2.5/weather'
};

const city = document.querySelector('.location');
const container = document.querySelector('.weather-container');
const condition = document.querySelector('#condition');
const icon = document.querySelector('.fas');
const time = document.querySelector('#time');
const temperature = document.querySelector('#temperature');
const feelsLike = document.querySelector('#feels-like');

const currentHour = new Date().getHours();

document.querySelector('.query').addEventListener('keypress', function (e) {
  const { value } = e.target;

  if (e.keyCode === 13) {
    fetchWeather(value);
  }
});

// Fetch weather and set values to dom
async function fetchWeather(query) {
  const request = await fetch(
    `${api.url}?q=${query}&units=metric&appid=${api.key}`
  );
  const weather = await request.json();

  // fetch country names
  const cnty = await fetch('countries.json');
  const countries = await cnty.json();

  city.innerHTML = `${weather.name}, <span>${
    countries[weather.sys.country]
  }</span>`;
  container.id = background(weather.weather[0].main);
  condition.innerText = weather.weather[0].main;
  icon.className = iconClass(weather.weather[0].main);
  time.innerText = partOfDay(currentHour);
  temperature.innerHTML = `${weather.main.temp.toFixed(0)}&#176;`;
  feelsLike.innerHTML = `${weather.main.feels_like.toFixed(0)}&#176;`;
}

// check and return which part of the day it is
function partOfDay(hour) {
  switch (hour) {
    case hour < 12:
      return 'Morning';
    case hour < 18:
      return 'Afternoon';
    default:
      return 'Evening';
  }
}

// check and return the right icon class for conditions
function iconClass(condition) {
  switch (condition) {
    case 'Thunderstorm':
      return 'fas fa-bolt';
    case 'Drizzle' || 'Rain':
      return 'fas fa-cloud-rain';
    case 'Snow':
      return 'fas fa-snowflake';
    case 'Mist' ||
      'Smoke' ||
      'Haze' ||
      'Dust' ||
      'Fog' ||
      'Sand' ||
      'Dust' ||
      'Ash' ||
      'Squall' ||
      'Tornado':
      return 'fas fa-smog';
    case 'Clear':
      return 'fas fa-grip-lines';
    case 'Sunny':
      return 'fas fa-sun';
    case 'Clouds':
      return 'fas fa-cloud';
  }
}

// check and return the right background color for conditions
function background(condition) {
  switch (condition) {
    case 'Thunderstorm' || 'Drizzle' || 'Rain':
      return 'weather-thunder';
    case 'Snow':
      return 'weather-snow';
    case 'Mist' ||
      'Smoke' ||
      'Haze' ||
      'Dust' ||
      'Fog' ||
      'Sand' ||
      'Dust' ||
      'Ash' ||
      'Squall' ||
      'Tornado':
      return 'weather-misty';
    case 'Sunny':
      return 'weather-sunny';
    default:
      return 'weather-regular';
  }
}
