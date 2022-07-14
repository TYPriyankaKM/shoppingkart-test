const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const Credentials = require("./middleware/credentials");
const app = express();
const PORT = 5000;
const corsOption = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(Credentials);
app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());

//middware for cookies

app.use("/api", require("./routes/apis/featureProduct"));
app.use("/api/user", require("./routes/apis/userDetail"));
app.use("/user", require("./routes/user/userRoutes"));
app.get("/", (req, res) => {
  res.send(`Home page`);
});

app.listen(PORT, () => console.log("server is running on port 5000"));
