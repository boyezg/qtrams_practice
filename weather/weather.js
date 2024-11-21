const apiKey = 'YOUR_API_KEY';
const form = document.getElementById('weather-form');
const locationInput = document.getElementById('location-input');
const loading = document.getElementById('loading');
const weatherDisplay = document.getElementById('weather-display');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');


async function getCoordinates(location) {
  const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${apiKey}`;
  const response = await fetch(geoUrl);
  if (!response.ok) {
    throw new Error('Failed to fetch coordinates');
  }
  const data = await response.json();
  if (data.length === 0) {
    throw new Error('Location not found');
  }
  return {
    lat: data[0].lat,
    lon: data[0].lon,
    name: data[0].name,
  };
}


async function fetchWeather(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  return response.json();
}


function processWeatherData(data, locationName) {
  return {
    city: locationName,
    temp: data.main.temp,
    desc: data.weather[0].description,
  };
}


function displayWeather(data) {
  cityName.textContent = `City: ${data.city}`;
  temperature.textContent = `Temperature: ${data.temp}°C`;
  description.textContent = `Description: ${data.desc}`;
  weatherDisplay.classList.remove('hidden');
}


form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const location = locationInput.value.trim();
  if (!location) return;


  loading.classList.remove('hidden');
  weatherDisplay.classList.add('hidden');

  try {
    
    const locationData = await getCoordinates(location);
    
    const rawData = await fetchWeather(locationData.lat, locationData.lon);
    
    const weatherData = processWeatherData(rawData, locationData.name);
   
    displayWeather(weatherData);
  } catch (error) {
    alert(error.message);
  } finally {
   
    loading.classList.add('hidden');
  }
});
