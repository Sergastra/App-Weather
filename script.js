
var button = document.querySelector('button');
const showData = document.querySelector('.showData');

let weather = {
    apiKey: '69a8fac1d9dd52a8f14279026d4b44fe',
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" + 
        city + "&lang={ru}&units=metric&appid=" + 
          this.apiKey 
      )
        .then((response) => {
          if (!response.ok) {
            alert("Нет данных.");
            throw new Error("Нет данных.");
          }
          return response.json();
        })
        .then((data) => this.showData(data));
    },
    showData: function (data) {
        showData.innerHTML = `
                                <ul>
                                    <li class="desc">
                                    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="icon"/> 
                                    ${data.weather[0].description} 
                                    </li>
                                    <li class="city">${data.name}</li>
                                    <li class="temp">${Math.round(data.main.temp)}°C</li>
                                    <li class="hum">Влажнось: ${data.main.humidity}%</li>
                                    <li class="speed">Скорость ветра: ${Math.round(data.wind.speed)}м/с</li>
                                </ul>
                                `;
    },
    search: function () {
      this.fetchWeather(document.querySelector(".inputTxt").value);
    },
  };

button.addEventListener('click', () => {
    weather.search();
});

button.addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
    weather.search();
    }
});

