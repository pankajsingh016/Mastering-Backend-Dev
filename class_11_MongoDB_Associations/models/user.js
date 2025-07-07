const mongoose = require('mongoose');
mongoose.connect(`mongodb://localhost:27017/mongopractise`);
const userSchema = mongoose.Schema({
    username:String,
    email:String,
    age:Number,
    posts:[
        {type:mongoose.Schema.Types.ObjectId,
            ref:'post'
        }
    ]
});

module.export = mongoose.model("AssociationMongo",userSchema);