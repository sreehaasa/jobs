const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres4',
  host: 'localhost',
  database: 'postgres4',
  password: '',
  port: 5434
})
