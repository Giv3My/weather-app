import { createApp } from 'vue';
import { createWebHistory, createRouter } from "vue-router";

import App from './App.vue';
import Home from './components/Home.vue';
import CityWeather from './components/CityWeather.vue';

const routes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/city-weather/:cityName',
        component: CityWeather,
        props: true,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});


createApp(App).use(router).mount('#app')