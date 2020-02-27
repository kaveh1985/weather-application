const request = require('request');

const geocode = (adresse, callback) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(adresse)}.json?access_token=pk.eyJ1Ijoia2F2ZWg4NSIsImEiOiJjazZ3YTZ6MnUwOXFoM2ZtdjJmM3Nja3pkIn0.rOCU1qcPi84jo2wyRoZBAg&limit=1`;
    request({ url, json: true },(err, { body } = {} ) => {
         if(err) {
         	callback('Unable to connect to location services!', undefined);
         } else if (body.features.length === 0) {
         	callback('Unable to find location. Try another search.', undefined);
         } else {
         	callback(undefined, {
         		latitude: body.features[0].center[1],
         		longitude: body.features[0].center[0],
         		location: body.features[0].place_name
         	})
         }
    })
    
}


module.exports = geocode;