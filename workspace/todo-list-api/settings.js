const apiServerPort = 3000;

const database = {
	host: 'localhost',
	port: 3306,
	user: 'mysql_user',
	password: 'mysql_password',
	database: 'todo_list_db',
	dateStrings: 'date'
};

module.exports = {
	database,
	apiServerPort
};
