const mysql = require( 'mysql' ); 

const connection =  mysql.createConnection({
    host: 'localhost',
    database: 'geniux',
    user: root,
    password: 'Ashe_Hada_Dragon_2020_Plata'
})

export default connection;