require('dotenv').config();

const jwt = require('jsonwebtoken');

function getIdAsInteger(req, res, next) {
	const id = +req.params.id; // conver to an integer
	if (Number.isInteger(id)) {
		next(); // allow next middleware function to execute
	} else {
		return res.status(400).json('ID must be an integer');
	}
}

function authenticate(req, res, next) {
	const { authorization } = req.headers;
	if (authorization) {
		// Authorization: Bearer token
		const token = authorization.split(' ')[1];
		jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
			if (error) {
				return res.status(401).json('Authentication error');
			} else {
				req.decoded = decodedToken;
				next();
			}
		});
	} else {
		return res.status(403).json('No token provided');
	}
}

module.exports = {
	getIdAsInteger,
	authenticate
};
