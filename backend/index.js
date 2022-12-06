const express = require("express");
const cors = require("cors");
const app = express();
const connection = require("./database/server");
const { signupRoute } = require("./routes/Authentication");

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("HomePage");
});

// authentication route
app.use("/auth", signupRoute);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("connected to db");
  } catch (err) {
    console.log(err);
  }
  console.log(`Server is running on port ${PORT}`);
});
