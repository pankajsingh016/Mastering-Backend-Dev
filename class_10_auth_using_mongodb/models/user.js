const mongoose = require('mongoose');
mongoose.connect(`mongodb://localhost:27017/mongopractise`)

const userSchema = mongoose.Schema({
  name:String,
email:String,
  password:String,
  age:Number
});

module.exports = mongoose.model('mongodbAuthJwt',userSchema);
