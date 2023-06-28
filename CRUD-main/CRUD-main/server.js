const mysql = require("mysql2");

const cors = require('cors');

const express = require('express');





const app = express();

app.use(express.json());

app.use(express.urlencoded({

    extended: true

}));

app.use(cors());

app.options('*', cors());

const connection = mysql.createConnection({

    host: "localhost",

    user: "root",

    password: "root",

    database: "Login"

});




// connect to the database

connection.connect(function(error){

    if (error) throw error

    else console.log("connected to the database successfully!")

});




const port =3001;

app.listen(port, () =>{

    console.log(`Server running on port ${port}`);

});




// Entire Database

//get login

app.get('/fetch', (req, res) => {

    const query = 'SELECT * FROM login' ;

    connection.query(query, (err, rows) => {

    if (err) {

    console.error('Error executing query:', err);

    res.status(500).json({ error: 'Failed to fetch users' });

    } else {

    res.json(rows);

    }

    });

    });




//post login

app.post('/add',(req, res) => {

    // Get the user data from the request body

   

    const user = req.body;

    const query = 'INSERT INTO login (id,Username,Password) VALUES (?,?, ?)' ;

    connection.query(query, [user.id,user.Username, user.Password],(err) => {

    if (err) {

    console.error('Error executing query:', err);

    res.status(500).json({ error: 'Failed to post users' });

    } else {

    res.send("posted");

    }

    });

    });




//validate

app.get('/api/validate', (req, res) => {




const { Username, Password } = req.query;

const query = 'SELECT * FROM login WHERE Username = ? AND Password = ?';

connection.query(query, [Username,Password], (err, results) => {

    res.set({

    "Allow-access-Allow-Origin": '*'

     })

    if (err) {

     

        console.error('Error executing query:', err);

     

     

      res.status(500).json({ error: 'Internal Server Error' });

 

    }

   else if (results.length > 0) {

     res.json(true);

    }

    else {

      res.json(false);

    } });

});




//get by login id

app.get('/getby/:Username', function(req, res) {

    // Get the ID from the request

    const user = req.params.Username;

   

    // Run a query to get the record with the given ID

    connection.query(`SELECT * FROM login WHERE Username = ${user}`, function(err, result) {

    if (err) {

    res.send(err);

    return;

    }

   

    // The result object will contain the record we requested

    res.json(result);

    });

    });

//////////////////////////////////////////////////////////////////////////////project details




//get project details

app.get('/fetchproject', (req, res) => {

    const query = 'SELECT * FROM project_details' ;

    connection.query(query, (err, rows) => {

    if (err) {

    console.error('Error executing query:', err);

    res.status(500).json({ error: 'Failed to fetch users' });

    } else {

    res.json(rows);

    }

    });

    });




///post project details

app.post('/addproject',(req, res) => {

    // Get the user data from the request body

   

    const user = req.body;

    const query = 'INSERT INTO project_details (project_id,project_name,total_team_members,start_date,end_date) VALUES (?,?,?,?,?)' ;

    connection.query(query, [user.project_id,user.project_name,user.total_team_members,user.start_date,user.end_date],(err) => {

    if (err) {

    console.error('Error executing query:', err);

    res.status(500).json({ error: 'Failed to post users' });

    } else {

    res.send(true);

    }

    });

    });




//getby project id




app.get('/getbyprojectid/:project_id', function(req, res) {

    // Get the ID from the request

    const user = req.params.project_id;

   

    // Run a query to get the record with the given ID

    connection.query(`SELECT * FROM project_details WHERE project_id = ${user}`, function(err, result) {

    if (err) {

    res.send(err);

    return;

    }

   

    // The result object will contain the record we requested

    res.json(result);

    });

    });




    //get by projectname

   




app.get('/getbyprojectname/:project_name', function(req, res) {

    // Get the ID from the request

    const user = req.params.project_name;

   

    // Run a query to get the record with the given ID

    connection.query(`SELECT * FROM project_details WHERE project_name = ${user}`, function(err, result) {

    if (err) {

    res.send(err);

    return;

    }

    // The result object will contain the record we requested

    res.json(result);

    });

    });




    //delete by project id

    app.delete('/deletebyprojectid/:project_id', function(req, res) {

        // Get the ID from the request

        const user = req.params.project_id;

       

        // Run a query to get the record with the given ID

        connection.query(`delete from project_details WHERE project_id = ${user}`, function(err) {

        if (err) {

            res.status(500).json({ error: 'Failed to post users' });

            return;

        }

        // The result object will contain the record we requested  
  else{
    res.send(true);

  }
        
        });

        });




    //project by project name

    app.delete('/deletebyprojectname/:project_name', function(req, res) {

        // Get the ID from the request
        const project_name = req.params.project_name;

       

        // Run a query to get the record with the given ID

        connection.query(`delete from project_details WHERE project_name = ${project_name}`, function(err) {

        if (err) {

            res.status(500).json({ error: 'Failed to delete users' });

            return;

        }

        // The result object will contain the record we requested  
  else{
    res.send(true);

  }

        });

        });

// 


// app.delete('/deleteone/:project_name',(req, res) => {

//     // Get the user data from the request body

   

//     const user = req.params.project_name;

//     const query = 'DELETE FROM project_details WHERE project_name  = ?' ;

//     connection.query(query, [user.project_name],(err) => {

//     if (err) {

//     console.error('Error executing query:', err);

//     res.status(500).json({ error: 'Failed to delete users' });

//     } else {

//     res.send(true);

//     }

//     });

//     });

//get by like operator




app.get('/likeby/:project_name', function(req, res) {

const pattern = `%`+req.params.project_name+`%`;

console.log(pattern)

// Execute the query

connection.query(`SELECT * FROM project_details WHERE project_name LIKE ?`, [pattern],(err, results) => {

    console.log(results)

if(err) {

console.log(err);

return;

}

res.send(results)

});

});