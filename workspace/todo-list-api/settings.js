require('dotenv').config();

const apiServerPort = 3000;

const database = {
	host: process.env.MYSQL_DB_HOST,
	port: process.env.MYSQL_DB_PORT,
	user: process.env.MYSQL_DB_USERNAME,
	password: process.env.MYSQL_DB_PASSWORD,
	database: process.env.MYSQL_DB,
	dateStrings: 'date'
};

module.exports = {
	database,
	apiServerPort
};
