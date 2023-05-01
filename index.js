const express = require('express');
const app = express();

const port = 8001;

app.listen(port, function(err) {
    if(err) {
        console.log(err);
        return;
    }
    console.log('Server is up and running on port number', port);
});