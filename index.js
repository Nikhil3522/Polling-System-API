const express = require('express');
const port = 8000;
const db = require('./config/mongoose');

const app = express();
app.use(express.urlencoded());

app.use('/', require('./routes'));

app.listen(port, function(err) {
    if(err){
        console.log("Error in running the server")
    }
    console.log('Express server is running on port: ', port)
})