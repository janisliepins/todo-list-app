const { gql } = require('apollo-server-express');

const taskSchema = require('./task');

const linkSchema = gql`
  type Query {
    _: Boolean
  }
`;

module.exports = [linkSchema, taskSchema];