const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2F0eWFwcmFrYXNoOTkiLCJhIjoiY2tpanJ6Z3pvMDJ4aTMxcWpicWV2OXowMyJ9.ju_kUWic5u2xZ48Rm-nvxQ&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to Connect to Location Services', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to Find Location.Try Another Search', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode