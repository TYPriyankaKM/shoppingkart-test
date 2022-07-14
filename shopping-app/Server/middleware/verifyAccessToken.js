const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyAccessToken = (req, res, next) => {
  let auth = req.headers["authorization"];
  //for unauthorized request
  if (!auth) return res.status(401).json({ message: "token is missing" });
  let token = auth.split(" ")[1];
  jwt.verify(token,process.env.ACCESS_TOKEN,(err, decoded) => {
      if (err) return res.status(403).json({ message: "invalid token" }); //invalid token
      //for valid token
      req.email = decoded.email;
      next();
  });

};

module.exports = verifyAccessToken;
