import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';
import { SWAGGER_PATH } from '../constants/index.js';

export const swaggerDocs = () => {
  try {
    const swaggerDocument = YAML.load(SWAGGER_PATH);
    return swaggerUI.setup(swaggerDocument);
  } catch (err) {
    console.error("Can't load swagger docs:", err);
    return (req, res) => res.status(500).send("Can't load swagger docs");
  }
};
