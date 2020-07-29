const path = require('path');
const express = require('express');
const hbs = require('hbs');
//const request = require('request');

const geocode = require('./utils/geocode');
const currentWeather = require('./utils/currentWeather');

const app = express();

// Define paths for Express config
const staticPath = "D:/Workspace/01_NodeJS_Tutorial/web-server/public";
const imgPath = "D:/Workspace/01_NodeJS_Tutorial/web-server/public/img";
// path to the handlebar views and partials
const viewsPath = "D:/Workspace/01_NodeJS_Tutorial/web-server/templates/views"
const partialsPath = "D:/Workspace/01_NodeJS_Tutorial/web-server/templates/partials"

// Set the handlebars engine to be used by express. 
app.set('view engine', 'hbs');   // hbs is the templating engine
app.set('views', viewsPath);  // the default handlebars 'views' changed to the specified folder with absolute path 
hbs.registerPartials(partialsPath);  // sets the path to the partials

// To serve static content
app.use(express.static(staticPath));
app.use(express.static(imgPath));  // for static images


// to render a hbs view for the root i.e. index page
app.get('', (req, res) => {
    res.render('index', {
        title: 'The fab weather app!',
        name: 'Sudipto Chatterjee'
    })
})

// to render a hbs view for the route /about
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Sachin',
        name: 'Sudipto Chatterjee'
    })
})

// to render a hbs view for the route /help
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Sudipto Chatterjee'
    })
})

// app.com/weather
app.get('/weather', (req, res) => {
    if (!req.query.address) return res.send({error: "You must provide an address to geocode."});
    
    const address = req.query.address
    geocode(address, (error, {latitude, longitude} = {}) => {
        if (error) {
            return res.send({
                loc: req.query.address,
                errorMessage: error
            })
        }

        currentWeather(latitude, longitude, (error, {currentTemp, currentFeelsLike, weatherDescription} = {}) => {
            if (error) {
                return res.send({
                    loc: req.query.address,
                    errorMessage: error
                })
            }

            // if the calls are good we will get the data here which can be send back
            const responseMessage = {
                loc: req.query.address,
                currently: currentTemp,
                feelsLike: currentFeelsLike,
                weatherDescr: weatherDescription
            }

            return res.send(responseMessage)
        })
    })
})


// 404 page in route /help
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found!',
        name: 'Sudipto Chatterjee'
    })
})

// general 404
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found!',
        name: 'Sudipto Chatterjee'
    })   
})

// start the server on port 3000
app.listen(3000, () => {
    console.log('Server is up on port 3000!')
})