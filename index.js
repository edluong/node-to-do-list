const express = require('express'); // import the express module to create a server
const  bodyParser = require('body-parser')
//const pug = require('pug');

const app = express(); // initialize an object
const port = 3000; // default port to listen on 


var task = ["write blog post","practice nodejs"];
var completed = ["finish react"];

//application settings
app.set("views","./views")
app.set("view engine","pug")


//middleware
app.use(bodyParser.urlencoded({extended: true})); //set up body parser
//express wont allow access to this folder; need this line to have css work explicitly
app.use(express.static("public"));

//routes
app.post("/addtask",(req,res) => {
    //grab what is in the text field
    var newTask = req.body.newtask;
    
    //add the new task
    task.push(newTask);

    //go back to root route
    res.redirect("/");
});

app.post("/removetask",(req,res)=>{

    //find all of the done tasks
    var completedTask = req.body.check;

    //check if there is only one option choosen
    if(typeof completedTask === "string"){
        
        //add the one task to the completed task array
        completed.push(completedTask);
        
        //get the index of the one checked list item
        var index = task.indexOf(completedTask);

        //find the index of the array of the element to remove; splice the element at the column
        if (index > -1){
            task.splice(index,1);
        }
    }
    else{
        //make sure it is an array of task completed
        if(typeof completedTask === 'object'){
            //look through all of the completed tasks and add them
            for(var i= 0;i < completedTask.length; i++){
                
                //add each completed task in the array
                completed.push(completedTask[i]);
                
                //remove the completed task from array of tasks
                task.splice(task.indexOf(completedTask[i],1));
                
            }
        }
    }  
    //reload the root route with the changes
    res.redirect("/");
});

app.get("/",(req,res) =>{
    res.render("index",{task:task,completed:completed}); //this will have the application render what is in the index views folder
});

app.listen(port,() =>{
    console.log(`running on port ${port}`)});