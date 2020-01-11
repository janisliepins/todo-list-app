const base = 'http://localhost:3000/api';
const axios = require('axios');

module.exports = {
	Query: {
		tasks: () => {
			return axios.get(`${base}/tasks`).then((response) => response.data);
		},
		task: (parent, { task_id }) => {
			return axios.get(`${base}/tasks/${task_id}`).then((response) => response.data);
		}
	}
};
