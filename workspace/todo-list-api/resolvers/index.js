const { gql } = require('apollo-server-express');

const taskSchema = require('./task');
// const listSchema = require('./list');

const linkSchema = gql`
	type Query {
		_: Boolean
	}
`;

module.exports = [ linkSchema, taskSchema ];
