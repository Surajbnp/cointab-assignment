const express = require("express");
const cors = require("cors");
const app = express();
const connection = require("./database/server");
const { signupRoute } = require("./routes/Authentication");

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  const timestamp = new Date().getTime();
  // console.log(timestamp); // 👉️ 1642664853302
  const date = new Date(timestamp);
  let d3 =  new Date(timestamp)
  let d1 = date.toLocaleString("sv")
  // console.log(date.toLocaleString("sv"));
  date.setDate(date.getDate() + 1);
  // console.log(date.toLocaleString("sv"));
  let d2 = date.toLocaleString("sv")

  console.log(d1 === d3.toLocaleString("sv"));

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
