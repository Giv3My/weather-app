<template>
  <div class="content">
    <div class="main">
      <div class="add-city">
        <p class="title">Add city</p>
        <input type="text" v-model.lazy="cityName" />
        <button @click="addCity">Apply</button>
      </div>
      <div class="choose-city">
        <p class="title">Choose City</p>
        <select v-model="currentCity">
          <option
            :key="index"
            v-for="(city, index) in cities"
            :value="city.name"
          >
            {{ city.name }}
          </option>
        </select>
        <button @click="redirect">Find out the weather</button>
      </div>
    </div>
    <div class="current-location-weather" v-if="currentCityWeather">
      <div class="city-weather">
        <div class="city">
          <div class="name" style="margin-right: 20px">
            <span>Now you are in: </span>
            <b>{{ currentCityWeather.name }}</b>
          </div>
        </div>
        <div class="city-humidity">
          Humidity:
          {{ currentCityWeather.main.humidity }}
        </div>
        <div class="city-temp">
          Temp:
          {{ Math.round(currentCityWeather.main.temp) }}
        </div>
        <div class="city-description">
          <img
            class="city-description-icon"
            :src="`http://openweathermap.org/img/wn/${currentCityWeather.weather[0].icon}@2x.png`"
            alt="description-icon"
          />
          <span>{{ currentCityWeather.weather[0].description }}</span>
        </div>
        <div class="city-pressure">
          Pressure: {{ currentCityWeather.main.pressure }} hpa
        </div>
        <div class="city-wind">
          Wind-speed: {{ currentCityWeather.wind.speed }}
        </div>
        <div class="city-wind-deg">
          Wind-deg: {{ currentCityWeather.wind.deg }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  data: function () {
    return {
      key: "5a984681ce3b8c946a1d2b3432cc905c",
      cityName: "",
      currentCity: "",
      currentCityWeather: null,
      cities: JSON.parse(localStorage.getItem("cities")) || [],
    };
  },
  mounted: function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.getCurrentCityWeather(position);
      });
    }
  },

  methods: {
    addCity: function () {
      if (this.cityName) {
        this.cities.push({ name: this.cityName });
      }

      localStorage.setItem("cities", JSON.stringify(this.cities));
      this.cityName = "";
    },

    redirect: function () {
      this.$router.push(`/city-weather/${this.currentCity}`);
    },

    getCurrentCityWeather: function (position) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/find?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&cnt=1&appid=${this.key}`
        )
        .then(({ data }) => (this.currentCityWeather = data.list[0]));
    },
  },
};
</script>

<style scoped>
.content {
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}

.main {
  display: flex;
  justify-content: space-between;
  width: 700px;
  height: 200px;
  padding: 30px;
  background: #fff;
  border-radius: 10px;
}

.add-city {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.add-city button {
  width: 80px;
}

.choose-city {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.title {
  font-weight: 700;
  margin: 0;
}

input,
select,
button {
  font-family: "Roboto", sans-serif;
  border: 1px solid rgb(143, 143, 143);
  background: transparent;
  border-radius: 5px;
}

input {
  width: 200px;
  padding: 5px 10px;
}

select {
  cursor: pointer;
  width: 200px;
  padding: 5px 10px;
}

button {
  cursor: pointer;
  padding: 5px 10px;
}

.current-location-weather {
  width: 700px;
  margin-top: 50px;
  background: #fff;
  border-radius: 10px;
}

.city-weather {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 350px;
  padding: 30px;
}

.city-description {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.city-description img {
  width: 100px;
  height: 100px;
}
</style>
