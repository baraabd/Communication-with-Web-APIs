console.log('Client side javascript file is loaded!')

const getButton = document.querySelector('#getButton')
const searchForm = document.querySelector('#searchForm')
const deleteForm = document.querySelector('#deleteForm')
const updateForm = document.querySelector('#updateForm')
const searchInput = document.querySelector('#searchInput')
const updateInput = document.querySelector('#updateInput')
const deleteInput = document.querySelector('#deleteInput')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



searchForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = searchInput.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    console.log('testing')

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
                document.getElementById("weatherPic").src = "";
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast.weather_descriptions;
                document.getElementById("weatherPic").src = data.forecast.weather_icons;
            }
        })
    })
})


getButton.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = searchInput.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    console.log('testing')

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
                document.getElementById("weatherPic").src = "";
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast.weather_descriptions;
                document.getElementById("weatherPic").src = data.forecast.weather_icons;
            }
        })
    })
})



updateForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = updateInput.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    console.log('testing')

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
                document.getElementById("weatherPic").src = "";
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast.weather_descriptions;
                document.getElementById("weatherPic").src = data.forecast.weather_icons;
            }
        })
    })
})

deleteForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = deleteInput.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    console.log('testing')

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
                document.getElementById("weatherPic").src = "";
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast.weather_descriptions;
                document.getElementById("weatherPic").src = data.forecast.weather_icons;
            }
        })
    })
})