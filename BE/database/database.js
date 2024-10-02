const { Client } = require('pg');

// Setup pgAdmin4 and connect individual
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'BK-printer',
    password: 'nkt3012',
    port: 5432,
});

client.connect();

// client.query('Select * from users', (err, res) => {
//     if(!err) {
//         console.log(res.rows);
//     }
//     else {
//         console.log(err.message);
//     }
//     client.end;
// })

module.exports = client;