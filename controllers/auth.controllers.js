const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const {
  hasCorrectPasswordFormat,
  isMongoError,
  isMongooseErrorValidation,
} = require("../utils/validators.utils");

exports.signup = async (req, res) => {
  try {
    const { password, username, email } = req.body;
    const hasMissingCredentials = !password || !email || !username;

    if (hasMissingCredentials) {
      return res.status(400).json({ message: "missing credentials" });
    }

    if (!hasCorrectPasswordFormat(password)) {
      return res.status(400).json({ message: "incorrect password format" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "email alredy exists" });
    }

    const name = await User.findOne({ username });

    if (name) {
      return res.status(400).json({ message: "username alredy exists" });
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({ username, email, hashedPassword });

    req.session.userId = newUser._id;

    return res.status(200).json({ user: newUser.email, id: newUser._id, username: newUser.username});
  } catch (e) {
    if (isMongooseErrorValidation(e)) {
      return res.status(400).json({ message: "incorrect email format" });
    }
    if (isMongoError(e)) {
      return res.status(400).json({ message: "duplicate field" });
    }
    return res.status(400).json({ message: "wrong request" });
  }
};

exports.login = async (req, res) => {
  try {
    const { password, email } = req.body;
    const hasMissingCredentials = !password || !email;
    if (hasMissingCredentials) {
      return res.status(400).json({ message: "missing credentials" });
    }

    if (!hasCorrectPasswordFormat(password)) {
      return res.status(400).json({ message: "incorrect password format" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user does not exist" });
    }
    const hasCorrectPassword = await bcrypt.compare(
      password,
      user.hashedPassword
    );
    if (!hasCorrectPassword) {
      return res.status(401).json({ message: "unauthorize" });
    }

    req.session.userId = user._id;

    return res.status(200).json({ user: user.email, id: user._id });
  } catch (e) {
    if (isMongooseErrorValidation(e)) {
      return res.status(400).json({ message: "incorrect email format" });
    }
    return res.status(400).json({ message: "wrong request" });
  }
};

exports.logout = async (req, res) => {
  await req.session.destroy();
  res.status(200).json({ message: "logout" });
};

exports.getUser = async (req, res) => {
  const { userId } = req.session;
  const { username,email, _id,myMotocycles } = await User.findById(userId) .populate("myMotocycles").lean();
  res.status(200).json({ id: _id, email, username,myMotocycles });
  
};
