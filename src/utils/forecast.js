const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherapi.com/v1/forecast.json?key=62d2507bb470425db8954053200612&q=' + latitude + ',' + longitude
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to Connect to Services', undefined)
        } else if (body.error) {
            callback('Unable To Find Location', undefined)
        } else {
            callback(undefined, body.forecast.forecastday[0].day.condition.text + ' It is Currently ' + body.current.temp_f + ' degrees Out.' + 'There is ' + body.current.precip_mm + '% chance of rain')
        }
    })
}

module.exports = forecast