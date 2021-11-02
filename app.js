const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { response } = require('express');
const port = 3000;
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: /http:\/\/localhost/ }));
app.options('*', cors());

app.get('/', (req, res) => {
    
    console.log( req );
    res.send({
        "success": true,
        "message": "User logged in successfully",
        "data": {}
    })

})

app.post('/login', (req, res) => {
    const body = req.body;
    let responseMessage = 'User logged in successfully';
    let status = true;

    if( body.username !== 'admin' && body.password !== 'admin'  ){
      status = false;
       
      if( body.username !== 'admin'  ){
        responseMessage = 'Usuario incorrecto';
      }
  
      if( body.password !== 'admin' ){
        responseMessage = 'Contraseña incorrecta';
      }

    } 

    res.send({
      "success": status,
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


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})