const { gql } = require('apollo-server-express');

module.exports = gql`
	extend type Query {
		lists: [List]
		list(task_list_id: Int!): List
	}

	type List {
		task_list_id: Int
		task_list_title: String
		task_list_user: Int
		tasks: [Task]
	}
`;
