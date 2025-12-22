import createHttpError from 'http-errors';
import swaggerUI from 'swagger-ui-express';
import fs from 'node:fs';
import { SWAGGER_PATH } from '../constants/index.js';

export const swaggerDocs = () => {
  try {
    if (!fs.existsSync(SWAGGER_PATH)) {
      console.error('Swagger file not found:', SWAGGER_PATH);
      return (req, res) => res.status(500).send("Can't load swagger docs");
    }

    const swaggerDocument = JSON.parse(fs.readFileSync(SWAGGER_PATH, 'utf8'));

    return swaggerUI.setup(swaggerDocument);
  } catch (err) {
    console.error("Can't load swagger docs:", err);
    return (req, res, next) =>
      next(createHttpError(500, "Can't load swagger docs"));
  }
};
