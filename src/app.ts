/* eslint-disable @typescript-eslint/no-var-requires */
// import all required packages
import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import mongoSanitize from 'express-mongo-sanitize';
import cors from 'cors';
import morganHandlers from './config/morgan';
import config from './config/config';
import { rateLimiter } from './helpers';
import globalErrorHandler from './helpers/globalErrorHandler';
import ApiError from './helpers/apiErrorConverter';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import sanitizeHtmlMiddleware from './middlewares/htmlSanitizer';
import routes from './routes';
import fs from 'fs';
import path from 'path';
import internalization from './internalization';

// initialize express app
const app = express();

// Initialize i18n
app.use(internalization.init);

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static('src/public'));

// Set the views directory
app.set('views', __dirname + '/views');

// log requests to console
app.use(morganHandlers.successHandler);
app.use(morganHandlers.errorHandler);

// parse json data and form data to body
app.use(express.json({ limit: '20mb' }));

// set security headers automatically
app.use(helmet());

// use cookies with admin panel
app.use(cookieParser());

// compress the requests
app.use(compression());

// clean income request for any unwanted codes
app.use(sanitizeHtmlMiddleware);
app.use(mongoSanitize());

// enable cors
app.use(
  cors({
    origin: [
      'http://127.0.0.1:5173',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:4200',
      'http://localhost:5173',
      'http://localhost:3000',
      'http://localhost:4200',
    ],
    credentials: true, // if using cookie add this line
  }),
);

// disable etag
app.disable('etag');

// Middleware to set language from query parameter or cookie
app.use((req, res, next) => {
  const lang = req.query.lang || req.cookies.lang || req.params.lang;
  if (lang) {
    res.setLocale(lang);
  }
  next();
});

// test proxy setup for express-rate-limit to work properly
//app.get("/ip", (request, response) => response.send(request.ip));
//app.get("/header", (request, response) =>
//  response.send(request.headers["x-forwarded-for"])
//);
// auth limiter in production mode
if (config.env === 'prod') {
  app.set('trust proxy', 2); // to prevent X-Forwarded-For header validation error
  app.use('/v1/auth/', rateLimiter.authLimiter);
}

// all v1 routes
app.use('/v1', routes);

// setup swagger docs endpoint
const swaggerOutputPath = path.join(__dirname, 'swagger-output.json');

if (!fs.existsSync(swaggerOutputPath)) {
  require('./swagger');
} else {
  const swaggerDocs = require('./swagger-output.json');
  if (config.env !== 'prod') {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  }
}

// welcome screen for the api if anyone visits
app.get('/', (req, res, next) => {
  res.render('index');
});

// 404 error
app.all('*', (req, res, next) => {
  next(new ApiError(`Can't find ${req.originalUrl} on the server!`, 404));
});

// handle all errors
app.use(globalErrorHandler);

// export the app
export default app;
