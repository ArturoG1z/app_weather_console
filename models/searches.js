const axios = require("axios");
const { readDB, saveDB } = require("../helpers/db");

class Searches {
	history = [];

	constructor() {
		const data = readDB();
    this.history = data.history;
	}

	get paramsMapbox() {
		return {
			access_token: process.env.MAPBOX_KEY,
			limit: 5,
			language: "en,es",
		};
	}

	get paramsWeather() {
		return {
			appid: process.env.OPENWHEATHER_KEY,
			units: "metric",
			lang: "en", // "es"
		};
	}

	async city(place = "") {
		let places;
		try {
			const instance = axios.create({
				baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
				params: this.paramsMapbox,
			});
			const resp = await instance.get();
			places = resp.data.features.map((place) => ({
				id: place.id,
				place_name: place.place_name,
				lon: place.center[0],
				lat: place.center[1],
			}));
			return places;
		} catch (error) {
			return places;
		}
	}

	async placeWeather(lat, lon) {
		try {
			const instance = axios.create({
				baseURL: `https://api.openweathermap.org/data/2.5/weather`,
				params: {
					...this.paramsWeather,
					lat,
					lon,
				},
			});
			const resp = await instance.get();
      const {weather, main} = resp.data;
			return {
				desc: weather[0].description,
				min: main.temp_min,
				max: main.temp_max,
				temp: main.temp,
				humidity: main.humidity,
			};
		} catch (error) {
      console.log(error);
      return {
        desc: null,
        min: null,
				max: null,
				temp: null,
				humidity: null,
      }
    }
	}

  addToHistory(place = '') {
    if(this.history.includes(place)) {
      return;
    }
    this.history = [place, ...this.history]
    saveDB({
      history: this.history
    });
  }

}

module.exports = Searches;
