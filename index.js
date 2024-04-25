import express from 'express';
import 'dotenv/config';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import apiRoutes from './routes/api/api.js';

const app = express();

app.use(express.json());

// const serveSwaggerUi = (req, res, next) => {
//   if (process.env.NODE_ENV !== 'development') {
//     next();
//   }
// };

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Price Calculator Express API with Swagger',
      version: '0.1.0',
      description: 'This is a simple API to calculate the price',
      license: {
        name: 'MIT',
        url: 'https://localhost:3000/',
      },
      contact: {
        name: 'Spurgeon Gnan Prakasham Tara',
        url: 'https://webdevparadise.com',
        email: 'prakashamtara07@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000/',
      },
    ],
  },
  apis: ['./routes/**/*.yaml'],
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const CORS = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.corsAllowedOrigin);
  res.setHeader(
    'Access-Control-Allow-Methods',
    // "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    'OPTIONS, GET, POST, PUT, DELETE',
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, Content-Length',
  );
  res.setHeader('Access-Control-Max-Age', '86400');
  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
  } else {
    next();
  }
};

app.use(CORS);

app.use('/api/v1', apiRoutes);

// app.use((req, res, next) => {
//   const error = new Error('Could not find this route.');
//   if (!error.statusCode) {
//     error.statusCode = 404;
//   }
//   next(error);
// });

app.use((err, req, res, next) => {
  if (res.headerSent) {
    return next(err);
  }
  const { statusCode } = err;
  const { message } = err;
  // const data = err.data;
  return res.status(statusCode || 500).json({
    message: message || 'An unknown error occurred!',
  });
});

export default app;
