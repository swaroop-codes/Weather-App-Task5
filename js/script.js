const apiKey = "3fa9c3fd12428f4c520800ae0ba0ac56";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("city");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const weatherIcon = document.getElementById("weatherIcon");

searchBtn.addEventListener("click", getWeather);

window.onload = () => {
    const lastCity = localStorage.getItem("lastCity");
    if (lastCity) {
        cityInput.value = lastCity;
        getWeather();
    }
};

async function getWeather() {

    const city = cityInput.value.trim();

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    localStorage.setItem("lastCity", city);

    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {

        const response = await fetch(url);
        const data = await response.json();

        if (data.cod != 200) {
            alert("City not found");
            return;
        }

        cityName.textContent = data.name;
        temperature.textContent = `Temperature: ${data.main.temp} °C`;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
        wind.textContent = `Wind Speed: ${data.wind.speed} m/s`;

        weatherIcon.src =
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    } catch (error) {

        alert("Something went wrong!");

    }
}