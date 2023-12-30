const mongoose = require('mongoose');
const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const axios = require('axios');
const projModel = require('./models/projModel');
const projRoutes = require('./routes/projectRoute');
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });
mongoose.connect(process.env.db_url, {
    useNewUrlParser: true, useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error"));
db.once("open", () => {
    console.log("Connected");
});

app.set('view engine', 'ejs');
app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', async (req, res) => {
    const resp = await projModel.find({});
    res.render('home', { resp });
})

app.use('/api', projRoutes);
module.exports = app;