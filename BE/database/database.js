const { Client } = require("pg");

// Setup pgAdmin4 and connect individual
const client = new Client({
  user: "avnadmin",
  host: "postgresql-asmcnpm.e.aivencloud.com",
  database: "UT-printer",
  password: "AVNS_qWYAfB6LzEKIWsqgq6i",
  port: 24975,
  ssl: {
    rejectUnauthorized: false // hoặc true nếu dịch vụ yêu cầu
  }
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
