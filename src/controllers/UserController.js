import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = new User({
      name,
      email,
      password,
    });

    // Validate email
    const cekUser = await User.findOne({ email });
    if (cekUser)
      return res.status(400).json({
        message: "Email telah digunakan!",
      });

    const saveUser = await newUser.save();
    res
      .status(200)
      .json({ message: "Pendaftaran Akun Berhasil!", data: saveUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email } = req.body;
  try {
    // Validate email
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Email tidak ditemukan!" });

    // Validate password
    const passwordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordValid)
      return res.status(401).json({ message: "Password salah!" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const { password, ...user_data } = user._doc;

    res
      .status(200)
      .json({ message: "Login Berhasil!", data: user_data, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  const user = await User.findOne({
    _id: req.user.id,
  });
  if (!user) res.status(401).json({ message: "unauthorized" });

  const { password, ...user_data } = user._doc;

  return res
    .status(200)
    .json({ message: `Hello ${user.name}`, data: user_data });
};
