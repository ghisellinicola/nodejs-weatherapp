const chalk = require('chalk')
const geo_utils = require('./geocode')
const weather_utils = require('./weather')

const getWeather = (city, callback ) => {

    // if (error){
    //     console.log(chalk.red("Is internet connection up?"))
    //     callback('Unable to connect to the forecast service!',undefined)
    // } 
    geo_utils.geocode(city, (error, { latitude, longitude, location } ) => { 
        if (error) {
            //console.log(chalk.red('Error: ' + error))
            callback(error,undefined)
        }
        // if (geolocation_data) {
        //console.log(chalk.gray('Data: ' + location + ', ' + latitude + ', ' + longitude))

        // ------------------------------------------------

        if (location !== undefined && latitude !== undefined && longitude !== undefined){

            weather_utils.weather({ latitude, longitude, location }, (error,{description, degrees, rain_perc}) => {
                if (error) {
                    //console.log(chalk.red('Error: ' + error)) 
                    callback(error,undefined)
                } else {
                    console.log(chalk.gray('Data: ' + description + ', ' + degrees + ', ' + rain_perc))
                    callback(undefined,{
                        description, degrees, rain_perc
                    })
                } 
            })

        }
        
    })
} 

module.exports = {
    getWeather: getWeather
}