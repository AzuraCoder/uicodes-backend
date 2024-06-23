import User from "../models/UserModel";

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
