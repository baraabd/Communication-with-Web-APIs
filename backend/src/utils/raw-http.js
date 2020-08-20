const http = require('http')
const url = 'http://api.weatherstack.com/current?access_key=e1acc672f48faa04f0ab6fd194c7e625&query=45,-75&units=f'

const request = http.request(url, (response) => {
    let data = ''

    response.on('data', (chunk) => {
        data = data + chunk.toString()
    })

    response.on('end', () => {
        const body = JSON.parse(data)
        console.log(body)
    })

})

request.on('error', (error) => {
    console.log('An error', error)
})

request.end()