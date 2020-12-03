const mongoose = require('mongoose');

const reqNumber = {
    type: Number,
    required: true
}

const reqString = {
    type: String,
    required: true
}

const userSchema = mongoose.Schema({
    _id: reqString,
    userId: reqString,
    guildId: reqString,
    karma: reqNumber,
    bronze: reqNumber,
    silver: reqNumber,
    gold: reqNumber
});

module.exports = mongoose.model('users', userSchema);