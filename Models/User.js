const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    profile:{
        type:String,
        default:'default.png',
    },
    parent_id:{
        type:Number,
        default:0,
    },
}, {
    timestamps:true,
    collection: 'users',
});

module.exports = mongoose.model('User', userSchema);