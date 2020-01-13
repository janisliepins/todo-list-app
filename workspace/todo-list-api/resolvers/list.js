require('dotenv').config();

const base = process.env.EXPRESS_API_URL;
const axios = require('axios');

module.exports = {
	Query: {
		lists: async (parent, args, context) => {
			return await axios
				.get(`${base}/lists`, {
					headers: {
						Authorization: context.authHeader
					}
				})
				.then((response) => response.data);
		},
		list: async (parent, { task_list_id }, context) => {
			// console.log(parent);
			return await axios
				.get(`${base}/lists/${task_list_id}`, {
					headers: {
						Authorization: context.authHeader
					}
				})
				.then((response) => response.data);
		}
	},
	List: {
		tasks: async (parent, args, context) => {
			// const { task_list_id } = parent;
			// console.log(parent);
			return await axios
				.get(`${base}/lists/${parent.task_list_id}/tasks`, {
					headers: {
						Authorization: context.authHeader
					}
				})
				.then((response) => response.data);
		}
	}
};
