import axios from "axios";

const apiKey = "c160bc867a394b1da24135226252102";

export async function getCurrentWeatherForLocation(location) {
    return  await axios.get("https://api.weatherapi.com/v1/current.json", {
        params: {
            key: apiKey,
            q: location,
            aqi: "no"
        }
    });
}

export async function getWeatherForecast(location, days) {

    return await axios.get("https://api.weatherapi.com/v1/forecast.json", {
        params: {
            key: apiKey,
            q: location,
            days: days,
            aqi: "no",
            alerts: "no",
        }
    })
}

export function displayForecast(days) {
    const forecastHolder = document.getElementById("forecast");
    forecastHolder.innerHTML = "";

    days.forEach((day) => {
        const card = document.createElement("div");
        card.className = "forecast-card";

        const location = localStorage.getItem("location");

        const dateEl = document.createElement("p");
        dateEl.className = "fc-date";
        dateEl.textContent = new Date(day.date).toLocaleDateString(undefined, {
            weekday: "short",
            day: "2-digit",
            month: "short",
        });

        const icon = document.createElement("img");
        icon.className = "fc-icon";
        icon.src = (day.day.condition.icon.startsWith("http") ? "" : "https:") + day.day.condition.icon;
        icon.alt = day.day.condition.text;
        icon.width = 64;
        icon.height = 64;

        const maxTemp = document.createElement("p");
        maxTemp.className = "fc-max";
        maxTemp.textContent = `${Math.round(day.day.maxtemp_c)}°C`;

        card.append(location, dateEl, icon, maxTemp);
        forecastHolder.appendChild(card);
    });
}

