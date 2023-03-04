const express = require('express')

require('./database/connection')

const student_router = require('./routers/students')
const module_router = require('./routers/modules')

const app = express()
const port = 3000

app.use('/api/students',student_router);
app.use('/api/modules',module_router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})