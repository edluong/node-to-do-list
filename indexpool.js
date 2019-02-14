const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const {Pool} = require('pg')
const port = 3000;

//connect to AWS RDS of PostGres
const pool = new Pool({
    user: 'dbmaster',
    host: 'node-todo-list.ctiqq74ve5hk.us-east-1.rds.amazonaws.com',
    database: 'postgres',
    password: '',
    port: 5432,
    max: 20, //from node-pg docs
    idleTimeoutMillis: 30000,  //from node-pg docs
    connectionTimeoutMillis: 2000, //from node-pg docs
});

//SQL Queries
//get a list query
const getListQuery = {
    text: 'SELECT * FROM list',
    rowMode: 'array'
}


//application settings
app.set('views','./views')
app.set('view engine','pug')


//middleware 
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public')); //need express to allow access to this folder


//get all completed tasks
app.get('/',(req,res) =>{
    
    pool.connect();

    pool.query(getListQuery,(err,result) =>{
        if(err){
            console.log(err);
            //res.send(err);
        }
        var task = result.rows;
        //console.log(result.rows);
        res.render('indextest',{task:task});
        //pool.end();
    });
});

//add new task route
app.post('/addtask',(req,res)=>{
    
    //grab the task provide into the input
    var newTask = req.body.newtask;

    //construct the SQL query to add task into postgres
    const insertNewTask = {
        text: 'INSERT INTO list(task) values($1)',
        values: [newTask],
        rowMode: 'array'
    }
    //connect to the database
    pool.connect();

    //run the query to insert the new task
    pool.query(insertNewTask,(err,result)=>{
        //if there is an error, then log it into the console.
        if(err){
            console.log(err);
        }
    });
    
    res.redirect('/');
    //pool.end();
})

app.listen(3000,() =>{
    console.log(`Server is listening on port ${port}`);
})
