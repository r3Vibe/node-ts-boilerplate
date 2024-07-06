import swaggerJsDoc from 'swagger-jsdoc';
import config from './config/config';
import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger-output.json';
const routes = ['./src/routes/index.ts'];

const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'MojiAi API',
      version: '0.0.5',
      description: 'Nodejs boilerplate',
    },
    servers: [
      {
        url: `http://127.0.0.1:${config.port}/v1`,
        description: 'V1 Local Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: routes,
};

const swaggerDocs = swaggerJsDoc(options);

swaggerAutogen()(outputFile, routes, swaggerDocs);
