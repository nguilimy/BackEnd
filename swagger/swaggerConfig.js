const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Google OAuth API',
      version: '1.0.0',
      description: 'Login via Google using Swagger documentation',
    },
    servers: [
      {
        url: 'http://localhost:4000',
      },
    ],
  },
  apis: ['../routes/googleAuth.js'], // 📌 only this file
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
