
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { response } = require('express');
const port = 3000;
const app = express();
const mysql = require( 'mysql' ); 
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const TOKEN_KEY =  '*XCXpzVC-W8Ukv-t';
const auth = require("./middleware/auth")
const connection =  mysql.createConnection({
    host: 'localhost',
    database: 'geniux',
    user: 'root',
    password: 'Ashe_Hada_Dragon_2020_Plata'
})

connection.connect(function(err){ 
  if( err ){
    console.error( 'Error connecting' + err.stack ); 
    return;
  }

  console.log( 'Connected as id' + connection.threadId );

});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: /http:\/\/localhost/ }));
app.options('*', cors());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

const updateUserToken = ( idUser, token ) => {
  connection.query( `UPDATE user SET token = '${token}' WHERE id = ${idUser}`, ( error, results, fields ) => {
    if (error) throw error;
    console.log('changed ' + results.changedRows + ' rows');
  });
}


app.post('/registration', (req, res) => {

  const {newPassword, personalEmail, phone} = req.body;

  connection.query( 
    `INSERT INTO user ( password, email, phone ) VALUES (
    '${ newPassword }',
    '${ personalEmail }',
    '${ phone }'
    );`, function( err, results, fields ){
      console.log( results ); 
      console.log( err );
      if( err ){ 
        throw err;
      }else{
        // Create token
        
        res.send({
          "success": true,
          "message": 'successfully registered user',
          "data": []
        })
      } 
    });
})

app.get( '/user', ( req, res ) => {
  
});

app.post('/login', (req, res) => {
  
  const body = req.body;
  let status = true;
  connection.query( `SELECT * FROM user where email = '${ body.username }' `, 
  
  function( err, results, fields ){
      if( err ) throw err;
      else{
        let data = null; 
        if( results ){
          if( body.password !== results[0].password  ){
            res.send({
              "success": false,
              "message": 'Invalid email',
              "error_code": 1308,
              "data": {}
            })
          } else {
            data = results[0]; 
            const personalEmail = data.email;
            const token = jwt.sign(
              { user_id: results.insertId, personalEmail },
              TOKEN_KEY,
              {
                expiresIn: "2h",
              }
            );

            updateUserToken( data.id, token );
            data['token'] = token;
            console.log(data);
            res.send({
              "success": true,
              "message": "User logged in successfully",
              "data": data
            })
          }
        } else {
          res.send({
            "success": false,
            "message": 'Invalid password',
            "error_code": 1308,
            "data": {}
          })
        }
      } 
    });

})


/*

app.get('/', (req, res) => {
    
    console.log( req );
    res.send({
        "success": true,
        "message": "User logged in successfully",
        "data": {}
    })

})

app.put( '/data-company', (req, res) => {
  const body = req.body;
  let responseMessage = 'User logged in successfully';
  let status = true;
 
  res.send({
    "success": status,
    "message": responseMessage,
    "data": body
  })
});

app.post('/data-company', (req, res) => {
  const body = req.body;
  let responseMessage = 'User logged in successfully';
  let status = true;
 
  res.send({
    "success": status,
    "message": responseMessage,
    "data": body
  })

})

app.post('/massive-import', (req, res) => {
  const body = req.body;
  let responseMessage = 'User logged in successfully';
  let status = true;
 
  res.send({
    "success": status,
    "message": responseMessage,
    "data": body
  })

})

app.delete( '/campains/:email', (req, res) => {
  const body = req.body;
  let responseMessage = 'User logged in successfully';
  let status = true;
 
  res.send({
    "success": status,
    "message": responseMessage,
    "data": body
  })

})

app.put( '/access-security/:email', (req, res) => {
  const body = req.body;
  let responseMessage = 'User logged in successfully';
  let status = true;
 
  res.send({
    "success": status,
    "message": responseMessage,
    "data": body
  })

})

app.post('/personal-data', (req, res) => {
  const body = req.body;
  let responseMessage = 'User logged in successfully';
  let status = true;
 
  res.send({
    "success": status,
    "message": responseMessage,
    "data": body
  })

})

app.post('/create-profile', (req, res) => {
  const body = req.body;
  let responseMessage = 'User logged in successfully';
  let status = true;
 
  res.send({
    "success": status,
    "message": responseMessage,
    "data": body
  })

})

app.get('/login', (req, res) => {
    const body = req.body;
    let responseMessage = 'User logged in successfully';
    let status = true;

    if( body.username !== 'admin' && body.password !== 'admin'  ){
      status = false;
       
      if( body.username !== 'admin'  ){
        responseMessage = 'Usuario no encontrado';
      } else if( body.password !== 'admin' ){
        responseMessage = 'Contraseña incorrecta';
      }

    } 

    res.send({
      "success": status,
      "message": responseMessage,
      "data": body
    })

})

app.post('/create-profile', (req, res) => {
  const body = req.body;
   
  res.send({
    "success": true,
    "message": responseMessage,
    "data": body
  })

})

app.post('/', (req, res) => {
    res.send({
        "success": true,
        "message": "User logged in successfully",
        "data": {}
    })

})

app.put('/', (req, res) => {
    res.send({
        "success": true,
        "message": "User logged in successfully",
        "data": {}
    })
})

*/

