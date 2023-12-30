const mongoose = require('mongoose');
const path = require('path');
const axios = require('axios');
const projModel = require('../models/projModel');
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
console.log(process.env.db_url);
mongoose.connect(process.env.db_url, {
    useNewUrlParser: true, useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error"));
db.once("open", () => {
    console.log("Connected");
});

const apiDB = async () => {
    await axios
        .get('https://picsum.photos/v2/list?page=1&limit=6')
        .then(async (response) => {
            // console.log(response.data);
            console.log(response.data);
            for (let i = 0; i < response.data.length; i++) {
                const Project = new projModel({
                    projectName: `Project ${i + 1}`,
                    authorName: response.data[i].author,
                    imageUrl: response.data[i].download_url
                });
                await Project.save();
                console.log('saved');
            }
        })
}

apiDB().then(() => {
    mongoose.connection.close();
})