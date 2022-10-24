const expressFunction = require("express");
const expressApp = expressFunction();

expressApp.use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Option, Authorization')
    return next()
});

expressApp.use(expressFunction.json());

//router

expressApp.use('/login', require('./routes/signin'))
expressApp.use('/user', require('./routes/user'))
expressApp.use('/register', require('./routes/course'))

// signin/login
// user/singup
// course/register

expressApp.listen(3000, function(){
    console.log('Listening on port 3000');  
});