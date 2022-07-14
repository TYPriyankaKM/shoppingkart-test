const UserJson = require("../Model/User.json");
const crypto = require("crypto");
const fs = require("fs").promises;
const jwt = require("jsonwebtoken");
const path = require("path");
const SampleUserObj = require("../Model/SampleUser.json");
const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);
// const mg = mailgun.client({
//   username: "api",
//   key: "37472fa2437adf20044e822d39f26998-4f207195-8769c2c4",
// });

const bcrypt = require("bcrypt");

const UserObj = {
  data: [...UserJson],
  addData: function (newData) {
    this.data = [...this.data, newData];
  },
};

async function reWrinteJson() {
  await fs.writeFile(
    path.join(__dirname, "../", "Model", "User.json"),
    JSON.stringify(UserObj.data)
  );
}

const RegisterUser = async (req, res) => {
  try {
    let salt = await bcrypt.genSalt(10);
    let hashPassword = await bcrypt.hash(req.body.password, salt);
    let randbytes = crypto.randomBytes(8).toString("hex");
    UserObj.addData({
      ...SampleUserObj,
      ...req.body,

      password: hashPassword,
      id: randbytes,
    });
    reWrinteJson();
    res.json({ Message: "successfully registered" });
  } catch {
    res.status(500);
  }
};

const SignInUser = async (req, res) => {
  let reqUser = UserObj.data.find(
    user => user.email === req.body.email || user.phone === req.body.email
  );
  if (reqUser == null) {
    res.json({ message: "Invalid email or password" });
    return;
  }

  try {
    if (await bcrypt.compare(req.body.password, reqUser.password)) {
      let { password, ...rest } = reqUser;
      // create access and refresh token
      let accessToken = jwt.sign(
        { email: reqUser.email },
        process.env.ACCESS_TOKEN,
        { expiresIn: "2h" }
      );
      // refresh token is sended as cookie to client
      let refreshToken = jwt.sign(
        { email: reqUser.email },
        process.env.REFRESH_TOKEN,
        { expiresIn: "1d" }
      );
      //adding refreshToken to the current user's database
      let otherUser = UserObj.data.filter(user => user.email !== reqUser.email);
      let currUser = { ...reqUser, refreshToken };
      UserObj.data = [...otherUser, currUser];
      //reWrite the user json file
      reWrinteJson();
      // sending refreshToken as cookie to the client
      res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
      });

      // sending accessToken as reponse to client
      res.json({ message: "success", userData: rest, token: accessToken });
    } else {
      res.json({ message: "Invalid email or password" });
    }
  } catch {
    res.status(4003);
  }
};

const getAllUsers = (req, res) => {
  res.json(UserObj.data);
};

// const forgotPassword = (req, res) => {
//   let userEmail = req.body.email;
//   let foundUser = UserObj.data.find(user => user.email === userEmail);
//   if (!foundUser) {
//     return res.json({ message: "Invalid" });
//   }

//   mg.messages
//     .create("sandbox341729995ce44b3a9e883e1d78ca02f2.mailgun.org", {
//       from: "Mailgun Sandbox <postmaster@sandbox341729995ce44b3a9e883e1d78ca02f2.mailgun.org>",
//       to: `${userEmail}`,
//       subject: "Reset Password LINK",
//       // text: `Please the click link below to reset your password
//       //     http://localhost:3000/reset
//       // `,
//       html: `<p>
//   Please click the link below to <b>reset</b> your password
//   &nbsp &nbsp<a style="color:blue;text-decoration:underline">http://localhost:3000/reset</a><br>
//   Its only valid for next 15 minutes.
// </p>`,
//     })
//     .then(msg => {
//       console.log(msg);
//       res.json({ message: "successs" });
//     }) // logs response data
//     .catch(err => console.log(err));
// };

module.exports = {
  RegisterUser,
  SignInUser,
  getAllUsers,
  // forgotPassword,
  UserObj,
};
