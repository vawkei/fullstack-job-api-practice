const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const user = require("../models/user");

const register = async (req, res) => {
  try {
    //console.log(req.body)
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(401).json({ msg: "Please provide credentials" });
    };

    if (password.trim().length < 7) {
      return res
        .status(401)
        .json({ msg: "Password should be more than 6 characters" });
    };

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const data = { name, email, password: hashedPassword };

    const user = await User.create(data);

    const token = jwt.sign(
      { _id: user._id, name: user.name },
      process.env.JWT_SECRET_II,
      {
        expiresIn: process.env.JWT_LIFETIME,
      }
    );


    res.status(201).json({ user: { name: user.name }, token });
  } catch (error) {
    if (error.keyPattern.email === 1) {
      return res
        .status(401)
        .json({ msg: "User already exists." });
    }
    res.status(401).json(error);
  }

  //res.send("<h1>Register Page </h1>");
};

const login = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(401).json({ msg: "Please provide credentials" });
    }
    

    const user = await User.findOne({ email });
    //console.log(user);//returns an object that matches the email from our db

    if (!user) {
      return res.status(400).json({ msg: "No user found" });
    }

    const verifyPassword = async (plainPassword, passwordInDB) => {
      const isValid = await bcrypt.compare(plainPassword, passwordInDB);
      return isValid;
    };                                          

    const isValid =await verifyPassword(password, user.password);
    if (!isValid) {
      return res.status(401).json({ msg: "Invalid password" });
    }

    const token = jwt.sign(
      { _id: user._id, name: user.name },
      process.env.JWT_SECRET_II,
      { expiresIn: process.env.JWT_LIFETIME }
    );

    res.status(201).json({ user: { name: user.name }, token });
  } catch (error) {
    res.status(401).json(error);
  }

  //res.send("<h1>Login Page</h1>");
};

module.exports = { register, login };
