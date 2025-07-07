const mongooose = require('mongoose');

const postSchema = mongoose.Schema({
    postdata:String,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'AssociationMongo'
    },
    data:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('post',postSchema);