const { gql } = require('apollo-server-express');

module.exports = gql`
	extend type Query {
    tasks: [Task]
  }
  
  type Task {
    task_id
  }
`;
