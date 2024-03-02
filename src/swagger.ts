import swaggerJsDoc from 'swagger-jsdoc';
import config from './config/config';

const options = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Stylaa API',
      version: '0.0.1',
      description:
        'Stylaa is online salon project where service providers can signup and list there services. Usual Customer can also login using their phone number and use the platform to find different services',
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
  apis: ['./src/routes/**/*.ts'],
};

const swaggerDocs = swaggerJsDoc(options);

export default swaggerDocs;
