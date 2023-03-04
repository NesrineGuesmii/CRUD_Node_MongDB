const mongoose = require('mongoose')

let Module_schema = new mongoose.Schema({
    name : String,
    note : Number
});

let Module = mongoose.model('Module',Module_schema)
 
module.exports.Module= Module