const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost:27017/mongopractise`)

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    image_url:String
});

module.exports = mongoose.model('user',userSchema);