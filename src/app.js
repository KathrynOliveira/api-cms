const express = require("express");
const app = express();
const port = 3000;

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

app.use(express.json());
app.use(authRoutes);
app.use(userRoutes);

app.listen(port, "0.0.0.0", () => {
  console.log(`Example app listening on port ${port}`);
});
