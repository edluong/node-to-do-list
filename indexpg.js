const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const {Client} = require('pg')
const port = 3000;

//connect to AWS RDS of PostGres
const client = new Client({
    
});

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
    
    client.connect();

    client.query(getListQuery,(err,result) =>{
        if(err){
            console.log(err);
            //res.send(err);
        }
        var task = result.rows;
        //console.log(typeof(result.rows));
        console.log(result.rows);
        res.render('indextest',{task:task});
        client.end();
    });
});


app.listen(3000,() =>{
    console.log(`Server is listening on port ${port}`);
})
