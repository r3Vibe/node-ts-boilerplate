import swaggerJsDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Boilerplate API(Update This)',
      version: '0.0.2',
      description:
        'Boilerplate code for nodejs rest api. use this in your projects. comes with authentication system builtin and custom error handling. please update this description and title for different projects',
      termsOfService: 'http://127.0.0.1:3030/',
      contact: {
        name: 'Arnab Gupta',
        url: 'http://127.0.0.1:3030/',
        email: 'arnab.gupta@weavers-web.com',
      },
    },

    servers: [
      {
        url: 'http://127.0.0.1:3030/v1',
        description: 'Development Server',
      },
      {
        url: 'http://127.0.0.1:3030/v2',
        description: 'Live Server',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerDocs = swaggerJsDoc(options);

export default swaggerDocs;
