const request = require('request');

var getWeather=(lat,lng, callback)=>{
    request({
        url: 'https://api.darksky.net/forecast/ba3a6dd5627f6598529cb0f3199a413a/'+lat+','+lng,
        json: true 
    },(error, response, body)=>{
        if(error){
            callback('unable to connect to forecast.io server');
        }else if(response.statusCode ===400){
            callback('unable to fetch weather');
        }else if(response.statusCode ===200){
            callback({
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        }
    });
};

module.exports.getWeather = getWeather;
