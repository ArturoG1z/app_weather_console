require('dotenv').config();
const { readInput, inquirerMenu, pause, listPlaces } = require("./helpers/inquirer")
const Searches = require("./models/searches");
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);
const main = async() => {
  let opt = -1;
  const searches = new Searches();

	do {
		opt = await inquirerMenu();

		if(opt === 1) {
      const place = await readInput('City:');
      const places = await searches.city(place);
      const id = await listPlaces(places);
      if(id === '0') continue;
      const selPlace = places.find(p => p.id == id);
      searches.addToHistory(selPlace.place_name);
      let {lat, lon} = selPlace;
      //weather
      //show results
      const {desc, min, max, temp, humidity} = await searches.placeWeather(lat, lon)
      if(desc){
        console.log('\nCity information\n'.green);
        console.log('City:', selPlace.place_name.green);
        console.log('Lat:', lat);
        console.log('Lng:', lon);
        console.log('How is the wheater:', capitalize(desc));
        console.log('Temperature:', temp > 18 ? temp.toString().red : temp.toString().green);
        console.log('Min:', max);
        console.log('Max:', min);
        console.log('Humidity:', `${humidity.toString()}%`.green, '\n');
      } else {
        console.log('No se pudo realizar la peticion al servidor de clima');
      }
      
    }
    else if (opt == 2){
      searches.history.forEach((place, i) => {
        const idx = `${i + 1}.`.green;
        console.log(`${idx} ${place}`);
      })
    }
		if (opt !== 0) await pause();
  } while(opt !== 0)

}


main();