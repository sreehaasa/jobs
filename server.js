// Set express as web application framework
const express = require('express');
//const bodyParser = require('body-parser');
const app = express();
const requestRoutes = require("./routes/requestRoutes");

// Use EJS as templating engine for views
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

//app.use(bodyParser.json());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

//app.use(express.json());

// Set Routes
app.use('/', requestRoutes);

// Set server port
const PORT = process.env.PORT || 3000;

module.exports = app;

 // Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

