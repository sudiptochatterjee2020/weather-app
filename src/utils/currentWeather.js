const request = require('request');

const currentWeather = (latitude, longitude, callback) => {
    const weatherToken = 'd8b5c2e40ce3457d9db35a1387c54af9';
    const weatherUrl = 'http://api.weatherstack.com/current?access_key=' + weatherToken + '&query=' + latitude + '%20' + longitude;

    // json: true parses the response value into a JSON string
    // refactored to use ES6 object destructuring syntax
    // request({url:url, json:true}, (error, response) => {
    request({url:weatherUrl, json:true}, (error, response) => {
        // if service is unavailable
        if (error) {
            callback({
                errCode : 404,
                errType : "Unavailable",
                errInfo : "Weather service is currently unavailable!"  
            }, undefined)
        } else {
            let {body} = response
            // An ill-formed API request can also lead to an error. For example: a blank query string
            if (body.error) {
                callback({
                    errCode : body.error.code,
                    errType : body.error.type,
                    errInfo : body.error.info        
                }, undefined)
            } else {
                callback(undefined, {
                    location: body.location.name,
                    currentTemp: body.current.temperature,
                    currentFeelsLike: body.current.feelslike,
                    weatherDescription: body.current.weather_descriptions
                })
            }
        }
    })
};

module.exports = currentWeather;