const allowedOrigins = ["http://localhost:3000"];

const Credentials = (req, res, next) => {
  const origin = req.header.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin:", "http://localhost:3000");
    res.header(
      "Access-Control-Allow-Headers:  Content-Type, X-Auth-Token, Authorization, Origin"
    );
    res.header("Access-Control-Allow-Methods:  POST, PUT");
  }
  next();
};

module.exports = Credentials;
