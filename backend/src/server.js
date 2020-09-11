const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const app = express();
const port = process.env.PORT || 3000;
let index = 0
const weatherApi = [];

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies



// Setup static directory to serve
app.use(express.static(publicDirectoryPath));
//app.use(express.json());

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Baraa Abdullatif",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Baraa Abdullatif",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send(error);
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send(error);
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
        console.log(location);
        console.log(forecastData);
      });
    }
  );
});

app.get("/api/weather", (req, res) => {
  res.json(weatherApi);
  console.log(weatherApi);
});



app.post("/api/weather", (req, res) => {
    const weather = req.body;
    console.log(weather)
    weatherApi.push(weather);
    res.status(201).json(weather);
});



app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Baraa Abdullatif",
    errorMessage: "Page not found.",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port" + port);
});
