const apiKey = "bb2d23d1ea1a28d285994f7a6155dd05"; // API anahtarınızı buraya yazın

document.getElementById("city-select").addEventListener("change", function () {
  const city = this.value;
  document.querySelector(".city--name").textContent = city;
  getWeather(city);
});

function getWeatherIcon(weatherId) {
  let iconUrl = "assets/img/topbar/default.png"; // Varsayılan resim yolu

  switch (weatherId) {
    case 800:
      iconUrl = "assets/img/topbar/clear.png"; // clear sky
      break;
    case 801:
    case 802:
    case 803:
      iconUrl = "assets/img/topbar/clouds.png"; // few clouds, scattered clouds
      break;
    case 804:
      iconUrl = "assets/img/topbar/cloudy.png"; // broken clouds
      break;
    case 500:
    case 501:
    case 502:
    case 503:
    case 504:
      iconUrl = "assets/img/topbar/rain.png"; // rain
      break;
    case 600:
    case 601:
    case 602:
    case 611:
    case 612:
    case 613:
    case 615:
    case 616:
    case 620:
    case 621:
    case 622:
      iconUrl = "assets/img/topbar/snow.png"; // snow
      break;
    case 701:
    case 711:
    case 721:
    case 731:
    case 741:
    case 751:
    case 761:
    case 762:
    case 771:
    case 781:
      iconUrl = "assets/img/topbar/mist.png"; // mist, smoke, haze, dust, fog, sand, dust, squalls, tornado
      break;
    default:
      iconUrl = "assets/img/topbar/default.png"; // Varsayılan resim yolu
      break;
  }

  return iconUrl;
}

async function getWeatherForecast(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=tr`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("API Response Data:", data); // Yanıtı konsola yazdır

    const weatherContainer = document.getElementById("weather-container");
    weatherContainer.innerHTML = ""; // Önceki hava durumu verilerini temizle

    // Hava durumu verilerini günlerine göre gruplayarak al
    let days = {};
    data.list.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const day = date.toLocaleDateString("tr-TR", { weekday: "short" }).toUpperCase();
      if (!days[day]) {
        days[day] = [];
      }
      days[day].push(item);
    });

    // İlk 5 günün hava durumu verilerini sıralamak ve HTML'e eklemek
    Object.keys(days)
      .slice(0, 5)
      .forEach((day) => {
        const dayData = days[day][0]; // Günün ilk saatine ait veriyi al

        const temp = Math.round(dayData.main.temp); // Sıcaklık değerini yuvarlama
        const weatherId = dayData.weather[0].id;
        const iconUrl = getWeatherIcon(weatherId);

        weatherContainer.innerHTML += `
          <div class="weather--day">
            <div class="weather--icon">
              <img src="${iconUrl}" alt="Weather Icon">
            </div>
            <div class="weather--temp">${temp}°C</div>
            <div class="weather--description">${day}</div>
          </div>
        `;
      });
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

// Şehir seçildiğinde hava durumu tahminlerini getir
document.getElementById("city-select").addEventListener("change", function () {
  const city = this.value;
  document.querySelector(".city--name").textContent = city;
  getWeatherForecast(city);
});

// Sayfa yüklendiğinde varsayılan olarak Manisa'nın hava durumunu yükle
document.addEventListener("DOMContentLoaded", function () {
  getWeatherForecast("Manisa");
});
