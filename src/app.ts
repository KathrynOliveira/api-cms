import express from "express";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import categoriesRoutes from "./routes/categoriesRoutes";

const app = express();
const port = 3000;

app.use(express.json());
app.use(authRoutes);
app.use(userRoutes);
app.use(categoriesRoutes);

app.listen(port, "0.0.0.0", () => {
  console.log(`Example app listening on port ${port}`);
});
