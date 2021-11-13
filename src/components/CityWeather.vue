<template>
  <div class="content">
    <div class="city-weather" v-if="cityWeather">
      <div class="city">
        <div class="name" style="margin-right: 20px">
          <b>{{ cityWeather.name }}</b>
        </div>
        <div class="country" style="margin-right: 20px">
          <b>{{ cityWeather.sys.country }}</b>
        </div>
        <div class="coord">
          <b>{{
            `[${cityWeather.coord.lat.toFixed(
              2
            )}; ${cityWeather.coord.lon.toFixed(2)}]`
          }}</b>
        </div>
      </div>
      <div class="city-humidity">
        Humidity:
        {{ cityWeather.main.humidity }}
      </div>
      <div class="city-temp">
        Temp:
        {{ Math.round(cityWeather.main.temp) }}
      </div>
      <div class="city-description">
        <img
          class="city-description-icon"
          :src="`http://openweathermap.org/img/wn/${cityWeather.weather[0].icon}@2x.png`"
          alt="description-icon"
        />
        <span>{{ cityWeather.weather[0].description }}</span>
      </div>
      <div class="city-pressure">
        Pressure: {{ cityWeather.main.pressure }} hpa
      </div>
      <div class="city-wind">Wind-speed: {{ cityWeather.wind.speed }}</div>
      <div class="city-wind-deg">Wind-deg: {{ cityWeather.wind.deg }}</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    cityName: String,
  },
  data: function () {
    return {
      key: "5a984681ce3b8c946a1d2b3432cc905c",
      cityWeather: null,
    };
  },
  mounted: function () {
    if (this.cityName) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&units=metric&appid=${this.key}`
        )
        .then(({ data }) => {
          this.cityWeather = data;
        });
    }
  },
};
</script>

<style scoped>
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.city-weather {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-width: 350px;
  height: 350px;
  padding: 30px;
  background: #fff;
  border-radius: 10px;
}

.city {
  display: flex;
  align-items: center;
}

.city-description {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.city-description img {
  width: 100px;
  height: 100px;
}
</style>