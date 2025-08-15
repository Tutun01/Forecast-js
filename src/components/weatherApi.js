import axios from "axios";

export async function getCurrentWeatherForLocation(location) {
   try {
       return  await axios.get(process.env.API_URL+"/v1/current.json", {
           params: {
               key: process.env.API_KEY,
               q: location,
               aqi: "no"
           }
       });
   } catch (exception) {
       alert("Error getting current weather");
   }
}

export async function getWeatherForecast(location, days) {
    try {
        return await axios.get(process.env.API_URL+"/v1/forecast.json", {
            params: {
                key: process.env.API_KEY,
                q: location,
                days: days,
                aqi: "no",
                alerts: "no",
            }
        });
    } catch (exception) {
        alert("Error getting forecast forecast");
    }
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


export async function getWeatherInFuture(location, date) {
 try {
     return await axios.get(process.env.API_URL+"/v1/future.json", {
         params: {
             key: process.env.API_KEY,
             q: location,
             dt: date
         }
     });
 } catch (exception) {
     alert("Error getting weather in Future");
 }
}

export function displayCurrentLocation(cityName, formattedDate, day, forecastContainer) {
    let card = document.createElement("div");
    card.classList.add("forecast-card");

    let locationEl = document.createElement("div");
    locationEl.classList.add("fc-location");
    locationEl.innerText = cityName;

    let dateEl = document.createElement("div");
    dateEl.classList.add("fc-date");
    dateEl.innerText = formattedDate;

    let iconEl = document.createElement("img");
    iconEl.classList.add("fc-icon");
    iconEl.src = day.day.condition.icon;
    iconEl.alt = day.day.condition.text;

    let tempEl = document.createElement("div");
    tempEl.classList.add("fc-max");
    tempEl.innerText = `${day.day.maxtemp_c}°C`;

    card.append(locationEl, dateEl, iconEl, tempEl);
    forecastContainer.appendChild(card);
}

