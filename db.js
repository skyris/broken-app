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
});

async function dbStart() {
    try {
        await sequelize.authenticate();
        console.log('Connected to DB');
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}

module.exports = {
    sequelize,
    dbStart
};
