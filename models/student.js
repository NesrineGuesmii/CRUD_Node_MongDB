const mongoose = require('mongoose')
const Joi = require('joi')
const uniqueValidator = require('mongoose-unique-validator');
Joi.objectId = require('joi-objectid')(Joi)
const student_schema = new mongoose.Schema({
    name : {
        type:String,
        minLength : 3,
        maxLength : 50,
        required : true
    },
    age: {
        type : Number,
        required:true,
        min : 18
    },
    email : {
        type:String,
        unique : true,
        required : true
    },
    modules : {
        moduleid : {
            type : mongoose.Types.ObjectId,
            ref:'Module'
        },
        name : String,
        note : Number 
    }
});
student_schema.plugin(uniqueValidator);
const validation_schema = Joi.object({
    name : Joi.string().min(3).max(50).required(),

    age : Joi.number().integer().min(18),
  
    email : Joi.string().email().required(),

    moduleId : Joi.objectId()
});

student_schema.methods.validateData =  function (data) {
    return validation_schema.validate(data).error;
}

const Student = mongoose.model('Student',student_schema);

module.exports.Student= Student;