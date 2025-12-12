import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "WATN API Documentation",
      version: "1.0.0",
      description: "API documentation for appointments system",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./routes/*.js", "./server.js"], // أماكن قراءة التوثيق
};

export const swaggerSpec = swaggerJsdoc(options);

export const swaggerUiMiddleware = swaggerUi;
