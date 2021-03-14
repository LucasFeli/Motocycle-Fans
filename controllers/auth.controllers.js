const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const {
  hasCorrectPasswordFormat,
  isMongoError,
  isMongooseErrorValidation,
} = require("../utils/validators.utils");

exports.signup = async (req, res) => {
  try {
    const { password, username,  email } = req.body;
    const hasMissingCredentials = !password || !email || !username ;
    console.log("body", req.body)
    if (hasMissingCredentials) {
      return res.status(400).json({ message: "missing credentials" });
    }

    if (!hasCorrectPasswordFormat(password)) {
      return res.status(400).json({ message: "incorrect password format" });
    }

    const user = await User.findOne({ email });
    const isAlreadyName = await NewUser.findOne({ username });

    if (user) {
      return res.status(400).json({ message: "email alredy exists" });
    }
    if (isAlreadyName) {
      return res.status("signup", {message: "this username already exist" });
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({ username,email, hashedPassword });

    req.session.userId = newUser._id;

    return res.status(200).json({ user: newUser.email, id: newUser._id });
    console.log("success signup ")
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
    console.log("success ")
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
  const { email, _id } = await User.findOne(userId);
  res.status(200).json({ id: _id, email });
};
