const yargs = require('yargs')

const axios  = require('axios');



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

var encodedAddress = encodeURIComponent(argv.address);

var geocodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address='+encodedAddress+'&key=AIzaSyBOYWNnYic-_bwg6Z2Wh7IxZvDyFMx03cw';

axios.get(geocodeUrl).then((response)=>{
    if(response.data.status==='ZERO_RESULTS'){
        throw new Error('Unable to find that address');
    }
    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weatherUrl = 'https://api.darksky.net/forecast/ba3a6dd5627f6598529cb0f3199a413a/'+lat+','+lng

    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
}).then((response)=>{
    var temperature = response.data.currenlty.temperature;
    var apparentTemperature = response.data.currenlty.apparentTemperature;
    console.log(temperature);
    console.log(apparentTemperature);
}).catch((e)=>{
    if(e.code==='ENOTFOUND'){
        console.log('Unable to connect to API Servers');
    }else{
        console.log(e.message);
    }
});

