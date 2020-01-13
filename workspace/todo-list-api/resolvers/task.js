require('dotenv').config();

const base = process.env.EXPRESS_API_URL;
const axios = require('axios');

module.exports = {
	Query: {
		tasks: async (parent, args, context) => {
			return await axios
				.get(`${base}/tasks`, {
					headers: {
						Authorization: context.authHeader
					}
				})
				.then((response) => response.data);
		},
		task: async (parent, { task_id }, context) => {
			return await axios
				.get(`${base}/tasks/${task_id}`, {
					headers: {
						Authorization: context.authHeader
					}
				})
				.then((response) => response.data);
		}
	},
	Task: {
		task_list: async (parent, args, context) => {
			// console.log(parent);
			return await axios
				.get(`${base}/lists/${parent.task_list}`, {
					headers: {
						Authorization: context.authHeader
					}
				})
				.then((response) => response.data);
		}
	}
};
