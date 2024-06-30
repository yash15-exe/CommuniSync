import userModel from "../Models/UserModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utilities/jwt.js";
const registerUser = async (req, res) => {
  console.log(req.body);
  try {
    const { username, password, email } = req.body;

    const existingUser = await userModel.findOne({ username });
    if (existingUser) {
      return res.status(409).json({
        message:
          "User already exists with this username. Please login or choose a different username.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new userModel({
      username,
      password: hashedPassword,
      email,
    });

    await newUser.save();

    const payload = { username };
    const token = await generateToken(payload);
    res.status(201).json({ token, message: "User registered successfully." , newUser});
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: `Error registering user: ${error.message}`,
    });
  }
};
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await userModel.findOne({ username });
    if (!existingUser) {
      return res.status(404).json({
        message: "User does not exist. Please check the username.",
      });
    }

    const isValidPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isValidPassword) {
      return res.status(401).json({
        message: "Incorrect password. Please try again.",
      });
    }

    const payload = { id: existingUser._id, username };
    const token = await generateToken(payload);
    res.status(200).json({ token, message: "Logged in successfully.",
      user:existingUser
     });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: `Error logging in user: ${error.message}`,
    });
  }
};
export { registerUser, loginUser };
