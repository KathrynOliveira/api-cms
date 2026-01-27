const express = require("express");
const app = express();
const port = 3000;

const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");

app.use(express.json());
app.use(authRoutes);
app.use(userRoutes);

app.listen(port, "0.0.0.0", () => {
  console.log(`Example app listening on port ${port}`);
});
