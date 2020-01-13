require('dotenv').config();
const settings = require('./settings');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const knex = require('knex')({
	client: 'mysql',
	connection: settings.database
});

// assuming that this info is coming from a form from a web app
const username = 'janis';
const password = 'janis';

knex('users')
	.where({
		username
	})
	.then((response) => {
		// password => raw password from a form, response[0].password => hashed in DB
		bcrypt.compare(password, response[0].password, (error, result) => {
			if (result) {
				console.log('Authentication successful');
				const payload = {
					username: 'janis',
					isAdmin: true
				};
				const secret = process.env.JWT_SECRET; // process.env.secret
				const expiresIn = 3600;
				const token = jwt.sign(payload, secret, { expiresIn });
				console.log(token);
			} else {
				console.log('Incorrect password');
			}
		});
	});
