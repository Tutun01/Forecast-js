import axios from "axios";
import { getUserLocation } from "./components/location.js";
import {
    getCurrentWeatherForLocation,
    getWeatherForecast,
    getWeatherInFuture,
    displayForecast,
    displayCurrentLocation
} from "./components/weatherApi.js";
import { getGeolocationForCoords } from "./components/openWeatherApi.js";
import { getDateInFuture } from "../helpers/dateHelper.js";

let location = localStorage.getItem("location") || getUserLocation();
updateLocation(location);

document.getElementById("changeLocation").addEventListener("click", () => {
  updateLocation(getUserLocation())
  window.location.reload();
})

document.getElementById("showWeatherForMyLocation").addEventListener("click", async () => {
    if (!navigator.geolocation) {
        return alert("Geolocation is not supported");
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
        try {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            let coords = await getGeolocationForCoords(lat, lon);
            let cityName = coords.data[0]["name"];

            if (cityName.includes("Municipality")) {
                cityName = cityName.replace("Municipality", "").trim();
            }
            location = cityName;
            updateLocation(cityName);

            const forecastResponse = await getWeatherForecast(cityName, 3);
            const forecastDays = forecastResponse.data.forecast.forecastday;
            const forecastContainer = document.getElementById("forecast-card");
            if (!forecastContainer) {
                console.error("The #forecast element does not exist in the DOM");
                return;
            }
            forecastContainer.innerHTML = "";

            for (const day of forecastDays) {
                const date = new Date(day.date);
                const options = { weekday: 'short', day: 'numeric', month: 'short' };
                const formattedDate = date.toLocaleDateString('en-GB', options);

                displayCurrentLocation(cityName, formattedDate, day, forecastContainer);
            }
        } catch (err) {
            console.error("Error:", err);
            alert("I can't get the weather data.");
        }
    });
});


    const response = await getCurrentWeatherForLocation(location);
    const {is_day} = response.data.current;
    let bodyElement = document.body.style;
    if (is_day !== 1) {
        bodyElement.backgroundColor = "#383838"
    } else {
        bodyElement.backgroundColor = "#fff"
    }

const forecastResponse = await getWeatherForecast(location, 3);

const days3 = forecastResponse.data.forecast.forecastday.slice(0, 3);
displayForecast(days3);


const dateFormatted = getDateInFuture();
const futureWeather = await getWeatherInFuture(location, dateFormatted);


function updateLocation(newLocation) {
    location = newLocation;
    localStorage.setItem("location", newLocation);
}

