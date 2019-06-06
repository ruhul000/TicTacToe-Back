const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let GameSchema = new Schema({
    gameID: {type: String, required: true},
})

module.exports = mongoose.model('game', GameSchema)