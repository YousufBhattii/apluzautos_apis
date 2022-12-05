const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let serviceSchema = new Schema({
    service_name:{
        type:String,
        required: true,
    },
    description:{
        type:String,
    },
    price:{
        type:String,
    },
}, {
    timestamps:true,
    collection: 'services',
});

module.exports = mongoose.model('Service', serviceSchema);