const settings = require('./settings');
const knex = require('knex')({
	client: 'mysql',
	connection: settings.database
});

const bcrypt = require('bcryptjs');
const saltRounds = 10;

knex.schema
	.hasTable('users')
	.then((exists) => {
		if (!exists) {
			return knex.schema
				.createTable('users', (table) => {
					table.increments('id');
					table.string('username');
					table.string('password');
				})
				.then(() => console.info('Users table created'))
				.catch((error) => console.error(error));
		} else {
			const username = 'janis';
			const password = 'janis';
			bcrypt.genSalt(saltRounds, (error, salt) => {
				bcrypt.hash(password, salt, (error, hash) => {
					return knex('users')
						.insert({ username, password: hash })
						.then(() => console.info(`${username} inserted`))
						.catch((error) => console.error(error));
				});
			});
		}
	})
	.catch((error) => console.error(error));
