const mysql = require('mysql2')

const pool = mysql.createPool({
  host: 'localhost',
  user: 'W3_92844_Pranjal',
  password: 'manager',
  database: 'car_service_database'
})

module.exports = pool


