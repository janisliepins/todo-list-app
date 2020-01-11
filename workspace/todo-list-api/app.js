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

const jsonParser = bodyParser.json();

const server = new ApolloServer({
	typeDefs: schema,
	resolvers: resolvers
});
server.applyMiddleware({ app });

const knex = require('knex')({
	client: 'mysql',
	connection: settings.database
});
app.locals.knex = knex;

router.get('/tasks', routes.tasks.getAllTasks);
router.get('/tasks/:id', middlewares.getIdAsInteger, routes.tasks.getTask);
router.post('/tasks', jsonParser, routes.tasks.createTask);
router.patch('/tasks/:id', jsonParser, middlewares.getIdAsInteger, routes.tasks.patchTask);
router.delete('/tasks/:id', middlewares.getIdAsInteger, routes.tasks.deleteTask);

router.get('/lists', routes.task_lists.getAllLists);
router.get('/lists/:id', middlewares.getIdAsInteger, routes.task_lists.getList);
router.get('/lists/:id/tasks', middlewares.getIdAsInteger, routes.task_lists.getTaskList);
router.post('/lists', jsonParser, routes.task_lists.createList);
router.patch('/lists/:id', jsonParser, middlewares.getIdAsInteger, routes.task_lists.patchList);
router.delete('/lists/:id', middlewares.getIdAsInteger, routes.task_lists.deleteList);

app.use('/api', router);

app.listen(settings.apiServerPort, () => console.info(`Server is listening on ${settings.apiServerPort}`));
