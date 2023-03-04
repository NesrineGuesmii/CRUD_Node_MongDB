const mongoose  = require('mongoose');
const {Student} = require('../models/student');

const { Module } = require('../models/module');
const router = require('express').Router();

router.post('/', async (req, res) =>{
    let student = new Student(req.body);
    let valid_err = student.validateData(req.body);
    //let module = await Module.findById(req.body.moduleId);
    if(valid_err)
        return res.status(400).send(valid_err.message);
   // if(!module)
       // return res.status(400).send('module id is not found');
    try {
       // student.module.id=module._id;
        //student.module.name = module.name;
        //student.module.note = module.note;

       student = await student.save();
       // await module.save()
    } catch (error) {
        return res.status(400).send(error.message);
    }
    
    res.status(201).send(student);
})

router.get('/', async (req, res) =>{
    let students = await Student.find();
    res.setHeader('numberOfElmts',students.length).status(200).send(students);
})

router.get('/id/:id', async (req, res) =>{
    if(!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send('The id is not a mongo db valid id.')
    let student = await Student.findById(req.params.id)
                                .populate('module.id');
    if(!student)
        return res.status(404).send('The student id not found.')
    res.status(200).send(student);
})

router.put('/id/:id', async (req, res) =>{
    if(!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send('The id is not a mongo db valid id.')
    let student = await Student.findById(req.params.id);
    if(!student)
        return res.status(404).send('The student id not found.')
    student = _.merge(student,req.body);
    student = await student.save();
    res.status(200).send(student);
})

router.delete('/id/:id', async (req, res) =>{
    if(!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send('The id is not a mongo db valid id.')
    let student = await Student.findByIdAndDelete(req.params.id);
    if(!student)
        return res.status(404).send('The student id not found.')
    res.status(200).send(student);
})

module.exports=router;