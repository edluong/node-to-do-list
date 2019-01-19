const express = require('express'); // import the express module to create a server
const  bodyParser = require('body-parser')
//const pug = require('pug');

const app = express(); // initialize an object
const port = 3000; // default port to listen on 


var task = ["buy socks","practice nodejs"];

//application settings
app.set("views","./views")
app.set("view engine","pug")



//middleware
app.use(bodyParser.urlencoded({extended: true})); //set up body parser


//routes
app.post("/",(req,res) => {
    //grab what is in the text field
    var newTask = req.body.newtask;
    
    //add the new task
    task.push(newTask);

    //go back to root route
    res.redirect("/");
});

app.get("/",(req,res) =>{
    res.render("index",{task:task}); //this will have the application render what is in the index views folder
});



app.listen(port,() =>{
    console.log(`running on port ${port}`)});