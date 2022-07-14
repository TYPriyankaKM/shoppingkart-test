const path = require("path");
let UserData = require("../Model/User.json");

const fsPromise = require("fs").promises;

const handleLogOut = async (req, res) => {
  let cookie = req.cookies;
  if (!cookie?.jwt) return res.sendStatus(204).send("no cookie");
  let token = cookie.jwt;
  let foundUser = UserData.find(user => user.refreshToken === token);
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, secure: true, SameSite: "None" });
    return res.sendStatus(200).json({message:"user not founded"});
  }
  //remove refreshToken from database
  let otherUser = UserData.filter(
    user => user.refreshToken !== foundUser.refreshToken
  );
  foundUser = { ...foundUser, refreshToken: "" };
  let newUserData = [...otherUser, foundUser];
  await fsPromise.writeFile(
    path.join(__dirname, "..", "Model", "User.json"),
    JSON.stringify(newUserData)
  );
  res.clearCookie("jwt", { httpOnly: true, secure: true, SameSite: "None" });
  res.sendStatus(200).json({message:"success"});
};

module.exports = handleLogOut;
