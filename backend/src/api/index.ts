import express from 'express';
import cors from 'cors';
import { authMiddleware } from '../middlewares/authMiddleware';
import { databaseMiddleware } from '../middlewares/databaseMiddleware';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import { createRateLimiter } from './apiRateLimiter';
import { languageMiddleware } from '../middlewares/languageMiddleware';
import { getConfig } from '../config';

const app = express();

// Enables CORS
//app.use(cors({ 
  //origin: "http://16.170.7.129:3000",
  // origin: true,
 // credentials: true 
//}));

app.use(cors());

// Initializes and adds the database middleware.
app.use(databaseMiddleware);

// Sets the current language of the request
app.use(languageMiddleware);

// Configures the authentication middleware
// to set the currentUser to the requests
app.use(authMiddleware);

// Default rate limiter
const defaultRateLimiter = createRateLimiter({
  max: 500,
  windowMs: 15 * 60 * 1000,
  message: 'errors.429',
});
app.use(defaultRateLimiter);

// Enables Helmet, a set of tools to
// increase security.
app.use(helmet());

// Parses the body of POST/PUT request
// to JSON
app.use(
    bodyParser.json({
        verify: function (req, res, buf) {
            const url = (<any>req).originalUrl;
            if (url.startsWith('/api/plan/stripe/webhook')) {
            // Stripe Webhook needs the body raw in order
            // to validate the request
            (<any>req).rawBody = buf.toString();
            }
        },
    }),
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", getConfig().FRONTEND_URL);
  // res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-COntrol-Allow-Headers", true);
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Credentials",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  next();
});

// Configure the Entity routes
const routes = express.Router();

require('./todolist').default(routes);

// Add the routes to the /api endpoint
app.use('/api', routes);

export default app;
