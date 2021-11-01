const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 3000;
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: /http:\/\/localhost/ }));
app.options('*', cors());

app.get('/', (req, res) => {
    res.send({
        "success": true,
        "message": "User logged in successfully",
        "data": {}
    })

})

app.post('/login', (req, res) => {
    res.send({
        "success": true,
        "message": "User logged in successfully",
        "data": {}
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