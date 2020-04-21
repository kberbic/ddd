import './configuration';
import * as express from 'express';
import * as correlator from 'express-correlation-id';
import * as cookieParser from 'cookie-parser';
import * as httpLogger from 'morgan';
import * as cors from 'cors';
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './generated/swagger.json';
import logger from '../utils/logger';
import { handleServerError, handleServerNotFound } from './errors';
import { RegisterRoutes } from './generated/routes';
// ########################################################################
// controllers need to be referenced in order to get crawled by the generator
import './routes/aircrafts';
import './routes/flights';
import './routes/users';

// ########################################################################

const app = express();
app.use(cors({
  origin: [
    /localhost/,
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: true,
  credentials: true,
}));

app.use(correlator({ header: 'x-correlation-id' }));
app.use(httpLogger('dev'));
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb' }));
app.use(cookieParser());

RegisterRoutes(app);

if (process.env.NODE_ENV === 'local') {
  app.use('/api-doc', (req, res, next) => {
    swaggerDocument['host'] = req.get('host');
    req['swaggerDoc'] = swaggerDocument;
    next();
  }, swaggerUi.serve, swaggerUi.setup());
}

app.use('/', (req, res) => res.json({ ok: 1, version: '1.0.0' }));

app.use(handleServerNotFound);
app.use(handleServerError);


app.listen(process.env.PORT,
  () => logger.info(`${process.env.npm_package_name} app listening on port ${process.env.PORT}! with ENV: ${process.env.NODE_ENV}`,
    {
      name: process.env.npm_package_name,
    }));
