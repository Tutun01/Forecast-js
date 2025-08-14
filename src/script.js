import axios from "axios";
import { getUserLocation } from "./components/location.js";
import {getCurrentWeatherForLocation, getWeatherForecast} from "./components/weatherApi";
import { displayForecast} from "./components/weatherApi";
import { refresh } from "./components/weatherApi.js";

let location = localStorage.getItem("location") || getUserLocation();
localStorage.setItem("location", location);

document.getElementById("changeLocation").addEventListener("click", () => {
  let location = getUserLocation();
  localStorage.setItem("location", location);
    window.location.reload();
})


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
