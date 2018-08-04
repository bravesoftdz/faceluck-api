require('dotenv').config();

const app = require('express')();
const cors = require('cors');
const mongoose = require('mongoose');
const requiredir = require('require-dir');
const bodyParser = require('body-parser');
const Raven = require('./app/services/sentry');

const dbConfig = require('./config/database');
const serverConfig = require('./config/server');

mongoose.connect(dbConfig.url);
requiredir(dbConfig.modelsPath);

app.use(cors());

app.use(bodyParser.json());

app.use(Raven.requestHandler());

app.use('/api', require('./app/routes'));

app.use(Raven.errorHandler());

app.listen(serverConfig.port, () => console.log(`Server is running in http://localhost:${serverConfig.port}/api`));
