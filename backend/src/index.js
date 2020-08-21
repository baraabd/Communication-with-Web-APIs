const express = require('express')
const weather = require('./models/weather')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/weather', async (req, res) => {
    const weather = new weather(req.body)

    try {
        await weather.save()
        res.status(201).send(weather)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.get('/weather', async (req, res) => {
    try {
        const weatherData = await weather.find({})
        res.send(weatherData)
    } catch (e) {
        res.status(500).send()
    }
})

app.get('/weather/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const weather = await weather.findById(_id)

        if (!weather) {
            return res.status(404).send()
        }

        res.send(weather)
    } catch (e) {
        res.status(500).send()
    }
})

app.patch('/weather:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const weather = await weather.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
        if (!weather) {
            return res.status(404).send()
        }

        res.send(weather)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.delete('/weather/:id', async (req, res) => {
    try {
        const weather = await weather.findByIdAndDelete(req.params.id)

        if (!weather) {
            return res.status(404).send()
        }

        res.send(weather)
    } catch (e) {
        res.status(500).send()
    }
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})