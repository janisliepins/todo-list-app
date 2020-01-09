function getAllLists(req, res) {
	const { knex } = req.app.locals;
	knex
		.select('task_list_id', 'task_list_title', 'task_list_user')
		.from('task_lists')
		.then((data) => res.status(200).json(data))
		.catch((error) => res.status(500).json(error));
}

function getList(req, res) {
	const { knex } = req.app.locals;
	const { id } = req.params;
	knex
		.select('task_list_id', 'task_list_title', 'task_list_user')
		.from('task_lists')
		.where({ task_list_id: `${id}` })
		.then((data) => {
			if (data.length > 0) {
				return res.status(200).json(data[0]);
			} else {
				return res.status(404).json(`ToDos List with ID ${id} not found`);
			}
		})
		.catch((error) => res.status(500).json(error));
}

function createList(req, res) {
	const { knex } = req.app.locals;
	// console.log(req.body);
	const payload = req.body;
	const mandatoryColumns = [ 'task_list_title', 'task_list_user' ];
	const payloadKeys = Object.keys(payload);
	const mandatoryColumnExists = mandatoryColumns.every((mc) => payloadKeys.includes(mc));
	if (mandatoryColumnExists) {
		knex('task_lists')
			.insert(payload)
			.then((response) => res.status(200).json('ToDos List created'))
			.catch((error) => res.status(500).json(error));
	} else {
		return res.status(400).json(`Mandatory columns are required: ${mandatoryColumns}`);
	}
}

function patchList(req, res) {
	const { knex } = req.app.locals;
	const { id } = req.params;
	const paylod = req.body;

	knex('task_lists')
		.where('task_list_id', id)
		.update(paylod)
		.then((response) => {
			if (response) {
				res.status(204).json();
			} else {
				return res.status(404).json(`ToDos List with id ${task_list_id} not found`);
			}
		})
		.catch((error) => res.status(500).json(error));
}

function deleteList(req, res) {
	const { knex } = req.app.locals;
	const { id } = req.params;

	knex('task_lists')
		.where('task_list_id', id)
		.del()
		.then((response) => {
			if (response) {
				res.status(200).json(`ToDos List with ID ${id} deleted`);
			} else {
				return res.status(404).json(`ToDos List with id ${id} not found`);
			}
		})
		.catch((error) => res.status(500).json(error));
}

function getTaskList(req, res) {
	const { knex } = req.app.locals;
	let { id } = req.params;
	task_list_id = +id;

	knex
		.select(
			't.task_id',
			't.task_title',
			't.task_target_date',
			't.task_completed',
			't.task_description',
			'tl.task_list_title'
		)
		.from('tasks as t')
		.innerJoin('task_lists as tl', function() {
			this.on('t.task_list', '=', 'tl.task_list_id').andOn('tl.task_list_id', '=', task_list_id); // ES5 syntax
		})
		.then((data) => {
			if (data.length > 0) {
				return res.status(200).json(data);
			} else {
				return res.status(404).json(`ToDos for List with ID ${task_list_id} not found`);
			}
		})
		.catch((error) => res.status(500).json(error));
}

module.exports = {
	getAllLists,
	getList,
	createList,
	patchList,
	deleteList,
	getTaskList
};
