const router = require('express').Router();
const  mongoose = require('mongoose');

const { Module } = require('../models/module');

router.post('/',async (req, res) =>{
    let module = new Module(req.body);
    try {

        module = await module.save();
    } catch (error) {
        return res.status(400).send(error.message);
    }
    
    res.status(201).send(module);
})

router.get('/',async (req, res) =>{
    let modules = await Module.find();
    res.status(200).send(modules);
})

router.get('/id/:id',async (req, res) =>{
    if(!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send('Given ID is not an ObjectId')
    let module = await Module.findById(req.params.id);
    if(!module)
        return res.status(404).send('Module is not found')
    res.status(200).send(module);
})

module.exports=router;