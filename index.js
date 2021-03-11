const  express = require('express');
const config = require('./config');
const router = require('./router'); 
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json())



app.use('/v1',router())

app.listen(config.port,() =>{
    console.log("Server started on port "+ config.port)
})
