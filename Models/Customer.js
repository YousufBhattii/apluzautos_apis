const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let customerSchema = new Schema({
    name:{
        type:String,
        required: true,
    },
    email:{
        type:String,
    },
    phone:{
        type:String,
    },
    address:{
        type:String,
    },
    tax:{
        type:String,
    },
    user_id:{
        type:String,
    }
}, {
    timestamps:true,
    collection: 'customers',
});

module.exports = mongoose.model('Customer', customerSchema);