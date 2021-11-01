const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 3000;
const app = express();


app.use( bodyParser.urlencoded({ extended: true }) );
app.use(  bodyParser.json() );
app.use( cors( {origin: /http:\/\/localhost/ } ) );
app.options( '*', cors() );

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
