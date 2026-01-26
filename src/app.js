const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const userRoutes = require("./routes/user");
app.use(userRoutes);

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.listen(port, "0.0.0.0", () => {
  console.log(`Example app listening on port ${port}`);
});
