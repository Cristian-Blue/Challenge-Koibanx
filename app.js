const mongoose = require('mongoose');
const logger = require('./utils/logger');
mongoose.Promise = Promise;
const express = require('express')
const app = express()
const dotenv = require('dotenv');
const basicAuth = require('express-basic-auth')
const {middlewareAuth , getUnauthorized} = require('./middleware/auth')
dotenv.config();
const config = require('config');
mongoose.connect('mongodb://' + config.get('mongodb.address') + '/' + config.get('mongodb.dbname'), { useNewUrlParser: true, useUnifiedTopology: true });
require('./utils/initializer').init()
app.use(express.json());
app.use('/api', 
        basicAuth({authorizer: middlewareAuth, 
                    authorizeAsync: true ,
                    unauthorizedResponse: getUnauthorized}) , 
        require('./routes/stores'));
app.listen(config.get('port'));
logger.info('API initialized on port ' + config.get('port'));

module.exports = app
