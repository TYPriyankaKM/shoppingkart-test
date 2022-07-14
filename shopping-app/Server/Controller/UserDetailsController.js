let userData=require("../Model/User.json")

const getUser = (req, res) => {
    userEmail = req.email;
    let { password, refreshToken, ...userDetails } = userData.find(
      user => user.email === userEmail
    );
    res.json({ userDetails });
    
}


module.exports = { getUser };