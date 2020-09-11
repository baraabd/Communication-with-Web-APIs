console.log("Client side javascript file is loaded!");

const addWeather = document.querySelector("#addWeather");
const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#searchInput");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const index= 0;
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = searchInput.value;
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  console.log("testing");

  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
        document.getElementById("weatherPic").src = "";
      } else {

        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast.weather_descriptions;
        document.getElementById("weatherPic").src = data.forecast.weather_icons;
      }
    });
  });
});


function oneWeather(data){
    const ul = document.querySelector('ul')
    const li = document.createElement('li')
    li.innerHTML = JSON.stringify(data.location + " " + data.weather_descriptions)
    ul.append(li)
}
addWeather.addEventListener("click", (e) => {
    e.preventDefault();
    
    const location = document.getElementById('message-1').innerHTML
    const weather_descriptions = document.getElementById('message-2').innerHTML
    const weather = {id: index, weather_descriptions: weather_descriptions, location: location}
    makeRequest(weather)
    oneWeather(weather)
    console.log("addWeather...")
    messageTwo.textContent = "";
});

 
async function makeRequest(weather) {
    const url = '/api/weather'

    const response = await fetch(url, {
        headers: { "Content-Type": "application/json" }, 
        method: 'POST',
        body: JSON.stringify(weather)
    })
   
    const data= await response.json()
    console.log(data)
}
