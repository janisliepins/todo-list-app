const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const app = express();
const router = express.Router();
const port = 3000;
const routes = require('./routes');
const settings = require('./settings');
const middlewares = require('./middlewares');
const bodyParser = require('body-parser');
const schema = require('./schema');
const resolvers = require('./resolvers');
const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
	const cpuCount = os.cpus().length;
	for (let i = 0; i < cpuCount; i++) {
		cluster.fork();
	}
} else {
	const jsonParser = bodyParser.json();

	const server = new ApolloServer({
		typeDefs: schema,
		resolvers: resolvers,
		context: ({ req }) => {
			return { authHeader: req.headers.authorization };
		}
	});
	server.applyMiddleware({ app });

	const knex = require('knex')({
		client: 'mysql',
		connection: settings.database
	});
	app.locals.knex = knex;

	router.get('/tasks', middlewares.authenticate, routes.tasks.getAllTasks);
	router.get('/tasks/:id', middlewares.authenticate, middlewares.getIdAsInteger, routes.tasks.getTask);
	router.post('/tasks', middlewares.authenticate, jsonParser, routes.tasks.createTask);
	router.patch(
		'/tasks/:id',
		middlewares.authenticate,
		jsonParser,
		middlewares.getIdAsInteger,
		routes.tasks.patchTask
	);
	router.delete('/tasks/:id', middlewares.authenticate, middlewares.getIdAsInteger, routes.tasks.deleteTask);

	router.get('/lists', middlewares.authenticate, routes.task_lists.getAllLists);
	router.get('/lists/:id', middlewares.authenticate, middlewares.getIdAsInteger, routes.task_lists.getList);
	router.get('/lists/:id/tasks', middlewares.authenticate, middlewares.getIdAsInteger, routes.task_lists.getTaskList);
	router.post('/lists', middlewares.authenticate, jsonParser, routes.task_lists.createList);
	router.patch(
		'/lists/:id',
		middlewares.authenticate,
		jsonParser,
		middlewares.getIdAsInteger,
		routes.task_lists.patchList
	);
	router.delete('/lists/:id', middlewares.authenticate, middlewares.getIdAsInteger, routes.task_lists.deleteList);

	app.use('/api', router);

	app.listen(settings.apiServerPort, () => console.info(`Server is listening on ${settings.apiServerPort}`));
}

cluster.on('exit', (worker) => {
	console.log(`Worker with ${worker.id} is gone`);
	cluster.fork();
});
