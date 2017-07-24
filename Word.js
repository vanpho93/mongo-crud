const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const WordSchema = new Schema({
    en: String,
    vn: String
});

const Word = mongoose.model('word', WordSchema);
module.exports = Word;