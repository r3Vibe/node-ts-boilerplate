import swaggerJsDoc from 'swagger-jsdoc';
import config from './config/config';

const options = {
  definition: {
    openapi: '3.0.1',
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
  apis: ['./src/modules/**/*.ts'],
};

const swaggerDocs = swaggerJsDoc(options);

export default swaggerDocs;
