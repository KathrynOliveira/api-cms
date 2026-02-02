import express from "express";
import helmet from "helmet";

import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import categoriesRoutes from "./routes/categoriesRoutes";
import articleRoutes from "./routes/articleRoutes";

import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
const swaggerDocument = YAML.load(path.join(__dirname, "..", "swagger.yaml"));

const app = express();
const port = 3000;

app.use(express.json());
app.use(helmet());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(authRoutes);
app.use(userRoutes);
app.use(categoriesRoutes);
app.use(articleRoutes);

if (process.env.NODE_ENV !== "test") {
  app.listen(port, "0.0.0.0", () => {
    console.log(`Example app listening on port ${port}`);
  });
}

export default app;
