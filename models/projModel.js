const mongoose = require('mongoose');

const projSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true
    },
    authorName: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Project', projSchema);