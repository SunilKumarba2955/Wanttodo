const express = require('express');
const app = express();
const port = 8001;


// Setting up Middle wares


// app.use(bodyParser.urlencoded({extended:false}));
app.use(express.urlencoded());
app.use(express.static('./assets'));

// Setting up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Main router from Home page
app.use('/', require('./routers/home'));

app.listen(port, function(err) {
    if(err) {
        console.log(err);
        return;
    }
    console.log('Server is up and running on port number', port);
});