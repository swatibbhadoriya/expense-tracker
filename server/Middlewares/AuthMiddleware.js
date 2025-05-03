const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

module.exports.userVerification = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ status: false, message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ status: false, message: "User not found" });
    }

    return res.status(200).json({ status: true, user: user.username });
  } catch (err) {
    return res.status(401).json({ status: false, message: "Invalid token" });
  }
};
