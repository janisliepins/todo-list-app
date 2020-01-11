const { gql } = require('apollo-server-express');

module.exports = gql`
	extend type Query {
		tasks: [Task]
		task(task_id: Int!): Task
	}

	type Task {
		task_id: Int
		task_title: String
	}
`;
