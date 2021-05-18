const Sequelize = require('sequelize');
const { 
    DATABASE_HOST,
    DATABASE_NAME,
    DATABASE_USER,
    DATABASE_PASSWORD,
} = require('./common/config');

const sequelize = new Sequelize(DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, {
    host: DATABASE_HOST,
    dialect: 'postgres'
})

sequelize.authenticate().then(
    function success() {
        console.log("Connected to DB");
    },

    function fail(err) {
        console.log(`Error: ${err}`);
    }
)

module.exports = sequelize;
