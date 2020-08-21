const Weather = mongoose.model('Weather', {
    forecast: {
        weather_descriptions: String,
        weather_icons: String,
        city: String,
        country: String
    }
})
module.exports = Weather