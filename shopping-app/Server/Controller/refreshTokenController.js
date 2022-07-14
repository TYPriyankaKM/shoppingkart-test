const UserObj = require("../Model/User.json");
const jwt = require("jsonwebtoken");

const RefreshToken = (req, res) => {
  let cookie = req.cookies;
  if (!cookie || !cookie.jwt) return res.sendStatus(401);
  let refreshtoken = cookie.jwt;
  let foundUser = UserObj.find(user => {
    return user.refreshToken == refreshtoken;
  });

  if (!foundUser) return res.sendStatus(403).send("Forbidden");
  //verify the refresh token using token in database
  jwt.verify(refreshtoken, process.env.REFRESH_TOKEN, (error, decoded) => {
    if (error || foundUser.email !== decoded.email) return res.sendStatus(403);
    const newAcessToken = jwt.sign(
      { email: decoded.email },
      process.env.ACCESS_TOKEN,
      { expiresIn: "1h" }
    );
    res.json({ token: newAcessToken });
  });
};

module.exports = RefreshToken;
