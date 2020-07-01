const express = require('express')
const request =  require('request')
const chalk = require('chalk')
const geo_utils = require('../utils/geocode')
const weather_utils = require('../utils/weather')
const forecast_utils = require('../utils/forecast')
const path = require('path') //built-in

const hbs = require('hbs') //hbs - plugin for express
const { pathToFileURL } = require('url')

// -------------------------------------------------------------------------

// logger utility test
// const winston = require('winston'); 
// const logger = winston.createLogger('server'); // from winston@3.x.x

// -------------------------------------------------------------------------

// create a web server
const server = express()

// Define paths for express config

// configure express 
//static pages and resources
const static_directory_path = path.join(__dirname,'..','public')


// to change views foldare name
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
hbs.registerPartials(partialsPath)

// -------------------------------------------------------------------------

//set up hbs engine and view location

// hbs set son key value configurations
server.set('view engine','hbs') // default location -> view
server.set('views', viewsPath)

// -------------------------------------------------------------------------

// setup static directory to serve
server.use(express.static(static_directory_path)) //not a complete setting!

// -------------------------------------------------------------------------

// Define the urls to which respond

// domain example: app.com
// app.com/help - app.com/about

// get( partial url , funtion(incoming request, outcoming response) )
server.get('', (req, res) => {
    //do whatever you what
    // Static
    //res.send(<h1>Hello to your Express Weather Home Page!</h1>')
    // Dynamic HBS
    res.render('index', {
        title: 'Weather Homepage',
        name: 'Nicola Ghiselli'
    })
    
    console.log(chalk.gray('home page request received'))
})

// -------------------------------------------------------------------------

server.get('/help', (req, res)  => {
    //do whatever you what
    res.render('help', {
            title: 'Welcome to the Help page!' ,
            admin: 'admin', email: 'help@forecast.com',
            name: 'Nicola Ghiselli'
        }
    )

    console.log(chalk.gray('help page request received'))
})

// -------------------------------------------------------------------------

server.get('/about', (req, res) => {
    //do whatever you what
    // res.send('<h1>Welcome to the About page!</h1>')
    res.render('about', {
        title: 'About',
        name: 'Nicola Ghiselli'
    })

    console.log(chalk.gray('about page request received'))
})

// -------------------------------------------------------------------------

server.get('/weather', (req, res) => {

    if(!req.query.location){
        console.log(chalk.red('Error: location not provided! (/weather?location=undefined)'))
        return res.send({
            error: 'You must provide a location to compute get the weather!'
        })
    }

    const forecast = forecast_utils.getWeather(req.query.location, (error, forecast) => {
        if (error){
            //console.log(chalk.red(error))
            return res.send({
                error: 'Unable to correctly communicate with the forecast service!',
                errorMessage: error
            })
            
        } else {
            console.log(chalk.yellow(JSON.stringify(forecast)))
            return res.send({
                location: req.query.location,
                forecast: forecast.description,
                degrees: forecast.degrees,
                rain_perc: forecast.rain_perc
            })
        }
    })    

    console.log(chalk.gray('weather request received'))
})

// -------------------------------------------------------------------------

// server.get('/products', (req, res) => {

//     if(!req.query.key){
//         return res.send({
//             error: 'You must provide a key value pair!'
//         })

//     } 

//     // req contains the query string informations
//     console.log(req.query.key)

//     res.send({
//         products: []
//     })
    
//     console.log(chalk.gray('products request received'))
    
    
// })

// -------------------------------------------------------------------------

// to get the url mismatches
server.get('/weather/*', (req, res) => {
    // res.send(' Weather article not found!')
    res.render('error', {
        title: 'Weather Page Not Found',
        error: 'Weather article not found!',
        name: 'Nicola Ghiselli'
    })

    console.log(chalk.gray('Error: /weather/* request received'))
})

// -------------------------------------------------------------------------

// to get the url mismatches
server.get('/about/*', (req, res) => {
    // res.send(' About article not found!')
    res.render('error', {
        title: 'About Page Not Found',
        error: 'About article not found!',
        name: 'Nicola Ghiselli'
    })

    console.log(chalk.gray('Error: /about/* request received'))
})

// -------------------------------------------------------------------------

// to get the url mismatches
server.get('/help/*', (req, res) => {
    // res.send(' Help article not found!')
    res.render('error', {
        title: 'Help Page Not Found',
        error: 'Help article not found!',
        name: 'Nicola Ghiselli'
    })

    console.log(chalk.gray('Error: /help/* request received'))
})

// -------------------------------------------------------------------------

// to get the url mismatches
server.get('*', (req, res) => {
    // res.send('my 404 page!')
    res.render('error', {
        title: '404',
        error: 'my 404 page!',
        name: 'Nicola Ghiselli'
    })

    console.log(chalk.gray('Error: 404 page not found'))
})

// -------------------------------------------------------------------------

// define on which port the server must listen

const port=3000

// start the server
// listen(port, callback)
server.listen(port, () => {
    console.log(chalk.green('Server is up on port ' + port))
})