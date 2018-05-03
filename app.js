const yargs = require('yargs');

var geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv  = yargs.options({
    a:{
        demand: true,
        alias: 'address',
        describe: 'Address to fetch weather for',
        string: true
    }
})
.help()
.alias('help', 'h')
.argv;

geocode.geocodeAddress(argv.address, (errorMessage, results)=>{
    if(errorMessage){
        console.log(errorMessage);
    }else{
        //console.log(results.address);
        weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults)=>{
            if(errorMessage){
                console.log(errorMessage);
            }else{
                console.log('its currently'+weatherResults.temperature+'it feels like'+weatherResults.apparentTemperature);
            }
        });
    }
});


//ba3a6dd5627f6598529cb0f3199a413a




