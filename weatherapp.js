// Path: Global_sky_mosaic/weatherapp.js
const API_KEY = 'f6fd5d5dc0d941209d8203319232004';

function getData() {
  const city = document.getElementById('campus-select').value;
  const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`;
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      displayWeatherData(data);
    })
    .catch((error) => {
      console.error('Error fetching weather data:', error);
    });
}

function displayWeatherData(data) {
  const temp = data.current.temp_f;
  const description = data.current.condition.text;
  const city = data.location.name;
  const country = data.location.country;

  const weatherInfo = document.getElementById("weather-info");
  weatherInfo.innerHTML = `
    <h2>${city}, ${country}</h2>
    <p>Temperature: ${temp}°F</p>
    <p>Weather: ${description}</p>
  `;
}

const campusSelect = document.getElementById("campus-select");

// Fetch weather data when the selected campus changes
campusSelect.addEventListener("change", (event) => {
  getData();
});

// Fetch weather data for the initial campus
getData();

