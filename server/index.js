const express = require('express')
const app = express()

app.use(require('cors')())
app.use(express.json())
app.use('/upload', express.static(__dirname + '/uploads'))

require('./lib/db')(app)
require('./routes/admin/index')(app)

app.listen(4100, () => {
  console.log('http://localhost:4100');
})