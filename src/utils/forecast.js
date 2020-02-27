const request = require('request');


const forecast = (latitude,longitude, callback) => {
	const url = "https://api.darksky.net/forecast/296c6ad692c8f86243a60fff55247771/" + latitude+ ',' + longitude;
	request({ url, json: true}, (error, { body } = {} ) => {
               if(error) {
               	callback("Unable to connect to data location", undefined);
               } else if(body.code === 400) {
               	callback("location not found. try another search!", undefined);
               } else {
               	 callback(undefined, {
               	 	precipType: body.currently.precipType,
               	 	temperature: body.currently.temperature,
               	 	precipProbability: body.currently.precipProbability,
               	 	timezone: body.timezone
               	 })
               }
  })
}

module.exports = forecast;