import bcrypt from "bcrypt";
import User from "../models/User.js";

// GET own profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    res.json(user);
  } catch {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};

// UPDATE name + email
export const updateProfile = async (req, res) => {
  try {
    const { fullName, email } = req.body;

    if (!fullName || !email) {
      return res.status(400).json({ error: "All fields required" });
    }

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { fullName, email },
      { new: true }
    ).select("-password");

    res.json(user);
  } catch {
    res.status(500).json({ error: "Profile update failed" });
  }
};

// CHANGE PASSWORD
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: "All fields required" });
    }

    const user = await User.findById(req.user.userId);

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Current password incorrect" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch {
    res.status(500).json({ error: "Password update failed" });
  }
};
