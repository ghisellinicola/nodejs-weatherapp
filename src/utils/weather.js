const request = require('request')
const chalk = require('chalk')

// ------------------------------------------------------------------------------------------

// OPENWEATHERMAP APIs
// the service used in the course is no more available

// city name
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}
// api.openweathermap.org/data/2.5/weather?q={city name},{state code}&appid={your api key}
// api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid={your api key}

// city id
// api.openweathermap.org/data/2.5/weather?id={city id}&appid={your api key}

// geocoding
// api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={your api key}

// zip code
// api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={your api key}

// options
// &lang=it
// &units=metric

// {
//     "id": 3181927,
//     "name": "Bologna",
//     "state": "",
//     "country": "IT",
//     "coord": {
//       "lon": 11.43333,
//       "lat": 44.466671
//     }
// }

// ------------------------------------------------------------------------------------------



// const weather_url = 'http://api.openweathermap.org/data/2.5/weather?q=dfgasdgfgag&appid=76f52ec85d81b9638ed51c0c1ae70b3b&units=metric'


const weather = (location, callback) => {

    const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + encodeURIComponent(location.latitude)+'&lon='+ encodeURIComponent(location.longitude)+'&appid=76f52ec85d81b9638ed51c0c1ae70b3b&units=metric'

    //short-hand (url) + destructuring (body)
    request( {url, json: true}, (error, {body }) => {

        if (error){

            console.log(chalk.red("Is internet connection up?"))
            callback('Unable to connect to the weather service!',undefined)

        } else if (body.cod<200 || body.cod>=300){

            console.log(chalk.red('Unable to find ' + location.location + '!'))
            console.log(chalk.gray(JSON.stringify(body)))
            // callback(JSON.stringify(body),{undefined,undefined,undefined})
            callback(JSON.stringify(body),undefined)

        } else {

            // console.log(body)

            const description = body.weather[0].main
            const degrees = body.main.temp
            const rain_perc = body.clouds.all

            const feels = body.main.feels_like
            const temp_min = body.main.temp_min
            const temp_max = body.main.temp_max
            
            console.log(chalk.blue(chalk.green.bold(description) + '. There are currently ' + chalk.green.bold(degrees+ ' °C') + ' out. There is a ' + chalk.green.bold(rain_perc+ ' %') + ' chance of rain.'))
            const forecast =  'It is ' + description + '. There are currently ' + degrees + ' °C' + ' out. That temperature feels like ' + feels + ' °C.' + 'Temperatures for the day will be included between ' + temp_min + ' °C and ' + temp_max + ' °C. ' + 'There is a ' + rain_perc + ' %' + ' chance of rain.'
            callback(undefined, forecast)
            // callback(undefined,{ description, degrees, rain_perc })
        }
    })

}

// ------------------------------------------------------------------------------------------

module.exports = {
    weather: weather
}