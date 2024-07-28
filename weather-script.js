async function fetchWeather(city) {
    try {
        const response = await fetch(`https://weatherapi-com.p.rapidapi.com/current.json?q=${encodeURIComponent(city)}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '449352ba10msh01e8e1c09d49a38p100993jsn136396436988',
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
        });

        if (!response.ok) {
            throw new Error('City not found or server error');
        }
        const result = await response.json();
        displayWeather(result);
    } catch (error) {
        console.error('Error fetching weather:', error);
        displayError(error.message);
    }
}

function displayWeather(data) {
    const weatherResult = document.getElementById('weatherResult');
    weatherResult.innerHTML = `
    <h2>${data.location.name}, ${data.location.country}</h2>
    <p>Temperature: ${data.current.temp_c}°C / ${data.current.temp_f}°F</p>
    <p>Condition: ${data.current.condition.text}</p>
    <p>Humidity: ${data.current.humidity}%</p>
    <p>Mind: ${data.current.wind_kph} km/h</p>
    `
}

function displayError(message) {
    const weatherResult = document.getElementById('weatherResult');
    weatherResult.innerHTML = `<p class="error">Error: ${message}</p>`;
}


document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.querySelector('.search-container input');
    const searchButton = document.querySelector('.search-button');


    function handleWeatherSearch() {
        const city = searchInput.value.trim();
        if (city) {
            console.log(`Searching for weather in ${city}`);
            fetchWeather(city);
        }
    }

    searchButton.addEventListener('click', handleWeatherSearch);
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            handleWeatherSearch();
        }
    })
});



