const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

// create express app
const app = express();
app.use(cors());

// Set up logging and body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())


require('./app/routes/nify.routes.js')(app);
const authMiddleware = require("./app/Middleware/auth-middleware");

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


const books = [
    {
        id: 1,
        name: "Harry Potter",
        image:
            "https://pmpub-catalogue.s3-eu-west-1.amazonaws.com/covers/web/9781781100240.jpg",
    },
    {
        id: 2,
        name: "Clean Code",
        image:
            "https://images-na.ssl-images-amazon.com/images/I/41jEbK-jG+L._SX374_BO1,204,203,200_.jpg",
    },
    {
        id: 3,
        name: "Javascript: The good parts",
        image: "https://images-na.ssl-images-amazon.com/images/I/81kqrwS1nNL.jpg",
    },
];


app.use("/", authMiddleware);

// define a simple route
app.get('/books', (req, res) => {
    return res.send({ books });
});

// listen for requests
app.listen(process.env.PORT || 5000)