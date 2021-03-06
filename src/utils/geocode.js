const request = require('request');

const geocode = (address, callback) => {
    const mapboxToken = process.env.MAPBOX_KEY
    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=' + mapboxToken + '&limit=1'

    request({url: geocodeURL, json: true}, (error, response) => {
        // if service is unavailable
        if (error) {
            callback('Mapbox geocoding API service is currently unavailable!', undefined)
        } else {
            const {body} = response
            // if a feature array has been returned we have a good request
            if (body.features.length > 0) {
                callback(undefined, {
                    latitude: body.features[0].center[1], 
                    longitude: body.features[0].center[0], 
                    location: body.features[0].place_name
                })
            } else {
                callback("Ill formed API request. Please correct and retry!", undefined)
            }
        }
    })
};

module.exports = geocode;