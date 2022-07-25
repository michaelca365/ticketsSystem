// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

module.exports = {
    development: {
      url: process.env.DATABASE_URL,
      dialect: 'postgres',
      ssl: true
    }, 
    production: {
      url: process.env.DATABASE_URL,
      dialect: 'postgres',
      ssl: true,
      dialectOptions: {
        require: true,
        rejectUnauthorized: false,
        ssl: true
      }
    }
  }