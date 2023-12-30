const mongoose = require('mongoose');
const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const axios = require('axios');

require("dotenv").config({ path: path.resolve(__dirname, "./.env") });
app.set('view engine', 'ejs');
app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', async (req, res) => {
    var resp;
    await axios
        .get('https://picsum.photos/v2/list?page=1&limit=6')
        .then((response) => {
            // console.log(response.data);
            console.log(response.data);
            resp = response.data
        })
    console.log(resp);
    res.render('home', { resp });
})
module.exports = app;