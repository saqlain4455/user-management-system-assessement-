import User from "../models/User.js";

// ==============================
// GET ALL USERS (ADMIN ONLY)
// ==============================
export const getAllUsers = async (req, res) => {
  try {
    // RBAC check
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied"
      });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const users = await User.find()
      .select("-password")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalUsers = await User.countDocuments();

    res.status(200).json({
      success: true,
      page,
      totalPages: Math.ceil(totalUsers / limit),
      totalUsers,
      users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users"
    });
  }
};

// ==============================
// ACTIVATE USER (ADMIN ONLY)
// ==============================
export const activateUser = async (req, res) => {
  try {
    // RBAC check
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied"
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    user.status = "active";
    await user.save();

    res.status(200).json({
      success: true,
      message: "User activated successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to activate user"
    });
  }
};

// ==============================
// DEACTIVATE USER (ADMIN ONLY)
// ==============================
export const deactivateUser = async (req, res) => {
  try {
    // RBAC check
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied"
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    user.status = "inactive";
    await user.save();

    res.status(200).json({
      success: true,
      message: "User deactivated successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to deactivate user"
    });
  }
};
