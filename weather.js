
const API_KEY = 'dbe2c0348b53deca981f9814a3b6d4c7';

const form = document.getElementById('searchForm');
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const messageEl = document.getElementById('message');
const resultEl = document.getElementById('result');

const placeName = document.getElementById('placeName');
const condition = document.getElementById('condition');
const temp = document.getElementById('temp');
const feelsLike = document.getElementById('feelsLike');
const pressure = document.getElementById('pressure');
const seaLevel = document.getElementById('seaLevel');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const city = cityInput.value.trim();

  if (!city) {
    showMessage('Type a city name first.');
    return;
  }

  fetchWeather(city);
});

function showMessage(text) {
  messageEl.textContent = text;
  resultEl.classList.remove('visible');
}

function fetchWeather(city) {
  searchBtn.disabled = true;
  searchBtn.textContent = 'Searching…';
  showMessage('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status === 404 ? 'City not found. Check the spelling.' : 'Something went wrong. Try again.');
      }
      return response.json();
    })
    .then(data => displayWeather(data))
    .catch(err => showMessage(err.message))
    .finally(() => {
      searchBtn.disabled = false;
      searchBtn.textContent = 'Search';
    });
}

function displayWeather(data) {
  const main = data.main;
  const wind = data.wind;
  const weatherDesc = data.weather && data.weather[0] ? data.weather[0].description : '—';

  placeName.innerText = `${data.name}, ${data.sys.country}`;
  condition.innerText = weatherDesc;

  temp.innerText = `${Math.round(main.temp)}°C`;
  feelsLike.innerText = `Feels like ${Math.round(main.feels_like)}°C`;

  pressure.innerText = `${main.pressure} hPa`;
  seaLevel.innerText = main.sea_level ? `${main.sea_level} hPa` : 'N/A';
  humidity.innerText = `${main.humidity}%`;
  windSpeed.innerText = `${wind.speed} m/s`;

  resultEl.classList.add('visible');
}