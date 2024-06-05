// Your array of API keys
const apiKeys = [
    "0e58b262575938dc2139b56038430d24",
    "0e58c262575938Ec2539c57038470e24",
    "0e58d262575938Ed2539c57038470f24",
    "0e58e262575938Ee2539c57038470g24",
    "0e58f262575938Ef2539c57038470h24",
    "0e58g262575938Eg2539c57038470i24",
    "0e58h262575938Eh2539c57038470j24",
    "0e58b262575938dc2139c56038430d24",
    "0e58i262575938Ei2539c57038470k24"
];
let apiIdx = 7;  // Start with the real key

// const apiKey = apiIdx;
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const apiKey = apiKeys[apiIdx];
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        return;
    }

    var data = await response.json();

    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    const currentHour = new Date().getHours();
    const isDayTime = currentHour >= 6 && currentHour < 18;

    function getWeatherIcon(weatherCondition) {
        const icons = {
            day: {
                Clouds: "images/clouds.png",
                Clear: "images/clear.png",
                Rain: "images/rain.png",
                Drizzle: "images/drizzle.png",
                Mist: "images/mist.png",
                Snow: "images/snow.png",
                Haze: "images/haze.png",
                Fog: "images/fog.png"
            },
            night: {
                Clouds: "images/Night_Time/cloudy-night.png",
                Clear: "images/Night_Time/moon.png",
                Rain: "images/Night_Time/rainy-night.png",
                Drizzle: "images/Night_Time/drizzle.png",
                Mist: "images/Night_Time/mist.png",
                Snow: "images/Night_Time/snow.png",
                Haze: "images/Night_Time/haze.png",
                Fog: "images/Night_Time/foggy-night.png"
            }
        };

        return isDayTime ? icons.day[weatherCondition] : icons.night[weatherCondition];
    }

    weatherIcon.src = getWeatherIcon(data.weather[0].main) || "images/default.png";

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keydown", (event) => {
if (event.key === "Enter") {
    checkWeather(searchBox.value);
}
});