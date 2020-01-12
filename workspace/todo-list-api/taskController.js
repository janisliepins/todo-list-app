function getAllTasks(req, res) {
	// console.log(req.decoded);

	const { knex } = req.app.locals;
	const { orderBy } = req.query;

	if (orderBy) {
		const regex = /(.*)(:)(ASC|DESC)/gi; // start with any char, followed by ':', followed by ASC or DESC, case insensetive, global
		if (regex.test(orderBy)) {
			const [ column, order ] = orderBy.split(':');
			knex
				.select('task_id', 'task_title', 'task_target_date', 'task_completed', 'task_description', 'task_list')
				.from('tasks')
				.orderBy(column, order)
				.then((data) => res.status(200).json(data))
				.catch((error) => res.status(500).json(error));
		} else {
			return res.status(400).json('If using a filter please use [field]:ASC|DESC');
		}
	} else {
		knex
			.select('task_id', 'task_title', 'task_target_date', 'task_completed', 'task_description', 'task_list')
			.from('tasks')
			.then((data) => res.status(200).json(data))
			.catch((error) => res.status(500).json(error));
	}
}

function getTask(req, res) {
	const { knex } = req.app.locals;
	const { id } = req.params;
	knex
		.select('task_id', 'task_title', 'task_target_date', 'task_completed', 'task_description', 'task_list')
		.from('tasks')
		.where({ task_id: `${id}` })
		.then((data) => {
			if (data.length > 0) {
				return res.status(200).json(data[0]);
			} else {
				return res.status(404).json(`ToDo with ID ${id} not found`);
			}
		})
		.catch((error) => res.status(500).json(error));
}

function createTask(req, res) {
	const { knex } = req.app.locals;
	// console.log(req.body);
	const payload = req.body;
	const mandatoryColumns = [ 'task_title', 'task_completed', 'task_list' ];
	const payloadKeys = Object.keys(payload);
	const mandatoryColumnExists = mandatoryColumns.every((mc) => payloadKeys.includes(mc));
	if (mandatoryColumnExists) {
		knex('tasks')
			.insert(payload)
			.then((response) => res.status(200).json('ToDo created'))
			.catch((error) => res.status(500).json(error));
	} else {
		return res.status(400).json(`Mandatory columns are required: ${mandatoryColumns}`);
	}
}

function patchTask(req, res) {
	const { knex } = req.app.locals;
	const { id } = req.params;
	const paylod = req.body;

	knex('tasks')
		.where('task_id', id)
		.update(paylod)
		.then((response) => {
			if (response) {
				res.status(204).json();
			} else {
				return res.status(404).json(`ToDo with id ${task_id} not found`);
			}
		})
		.catch((error) => res.status(500).json(error));
}

function deleteTask(req, res) {
	const { knex } = req.app.locals;
	const { id } = req.params;

	knex('tasks')
		.where('task_id', id)
		.del()
		.then((response) => {
			if (response) {
				res.status(200).json(`ToDo with ID ${id} deleted`);
			} else {
				return res.status(404).json(`ToDo with id ${id} not found`);
			}
		})
		.catch((error) => res.status(500).json(error));
}

module.exports = {
	getAllTasks,
	getTask,
	createTask,
	patchTask,
	deleteTask
};
