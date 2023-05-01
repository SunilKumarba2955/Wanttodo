const express = require('express'); // requiring express module
const cookieParser = require('cookie-parser');
const port = 8001;
const app = express();
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose'); // requiring Mongoose file and Connecting to database

// Used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');

// Setting up Middle wares
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.urlencoded());
app.use(express.static('./assets'));
app.use(expressLayouts);

// Setting up view engine
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'user_id',
    // Todo change before deployment in the production mode
    secret: 'PasswordKaditiya?Loude...!',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    },
    store: MongoStore.create({
        // mongooseConnection: db,
        mongoUrl: 'mongodb://127.0.0.1:27017/Wanttodo',
        autoRemove: 'disabled'
    }), // add a comma here
    function(err) {
        console.log(err || 'connect mongodb setup ok');
    }
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// Main router for Home page
app.use('/',require('./routers/index'));

// Listen to server
app.listen(port, function(err) {
    if(err) {
        console.log('Error in enabling server');
        return;
    }
    console.log("My server is up and running in port number",port);
});