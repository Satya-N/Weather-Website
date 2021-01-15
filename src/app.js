const path = require('path')
const { response } = require('express')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')



const app = express()
const port = process.env.PORT || 3000
    // Define Path For Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// SetUp Handlebars Engine And Views Location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup Static directory To Serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Satya Prakash'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About This Page',
        name: 'Satya'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'HELP!!!!!',
        name: 'Satya'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Give a Address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({ error })
            }
            forecast(latitude, longitude, (error, forecastData) => {
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
            })
        })
        // res.send({
        //     forecast: 'Its Freezing',
        //     location: 'bhubaneswar',
        //     address: req.query.address
        // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You Must Provide a Search Term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Error',
        name: 'Satya',
        errorMessageHelp: 'Help Not Found'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Satya',
        errorMessage: 'Page Not Found'
    })
})


app.listen(port, () => {
    console.log('Server Is up on Port ' + port)
})