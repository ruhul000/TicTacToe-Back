const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    square: {type: Object, required: true},
    player: {type: Number, required: true},
})

module.exports = mongoose.model('user', UserSchema)