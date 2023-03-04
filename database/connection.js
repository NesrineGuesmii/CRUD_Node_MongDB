const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/students')
.then(()=> console.log('MongoDB is connected'))
.catch(err => console.log('MongoDB is down, raison :',err))