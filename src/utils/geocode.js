const request = require('request')
const chalk = require('chalk')

// ------------------------------------------------------------------------------------------

    //GeoCoding - MapBox.com
    // Address -> Lat/Long -> Weather

    // https://docs.mapbox.com/api/search/#forward-geocoding

    // example
    // https://api.mapbox.com/geocoding/v5/mapbox.places/{city name}.json?access_token={access token}

    // apikey
    // pk.eyJ1IjoibmdoaXNlbGxpIiwiYSI6ImNrYnY2eHFkcTAzN2wyeG14OTE4djN2cTAifQ.g05Bt_4yvhCckFfUPy5TkQ

    // options
    // &limit=1

// ------------------------------------------------------------------------------------------

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibmdoaXNlbGxpIiwiYSI6ImNrYnY2d280ZDAzNzYyeXA3MnRjcjhiZ2cifQ.IqseKyLeacLSkPIQGkPjsQ&limit=1'

    
    request({ url , json:true}, (error, {body}) => {
        if (error) {
            console.log(chalk.red("Is internet connection up?"))
            //then we need to return back the error -> callback
            callback('Unable to connect to the geolocation service!',undefined) //undefined will be implicit if not declared
        } else if (body.features.length === 0 ) {
            console.log(chalk.red(body.query[0] + ' city does exists?'))
            callback(body.query[0] + ' was not recognized by the geolocation service!', {undefined,undefined,undefined})
        } else {
            const location = body.features[0].place_name
            const latitude = body.features[0].center[1]
            const longitude = body.features[0].center[0]
            console.log(chalk.blue(chalk.green.bold(location) + ' is locate at latitude ' + chalk.green.bold(latitude+'°') + ' and at longitude ' + chalk.green.bold(longitude+ '°')))
            callback(undefined,{latitude, longitude, location})
        }
    })
}

module.exports = {
    geocode: geocode
}