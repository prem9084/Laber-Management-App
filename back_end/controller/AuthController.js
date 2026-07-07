import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, fatherName, mobile, email, password, address } = req.body;
    // Validate user input

    // switch cash

    switch (true) {
      case !name:
        return res.status(400).json({ message: "Name is required" });
      case !fatherName:
        return res.status(400).json({ message: "Father's Name is required" });
      case !mobile:
        return res.status(400).json({ message: "Mobile is required" });
      case !password:
        return res.status(400).json({ message: "Password is required" });
      default:
        break;
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ mobile });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({
      name,
      fatherName,
      mobile,
      email,
      password: hashedPassword,
      address,
      createdBy: req.user._id,
    });
    await user.save();
    res.status(201).json({
      data: {
        name: user.name,
        fatherName: user.fatherName,
        mobile: user.mobile,
        email: user.email,
        address: user.address,
      },

      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error registering user" });
  }
};

export const loginController = async (req, res) => {
  try {
    const { mobile, password } = req.body;

    // Validate user input
    if (!mobile || !password) {
      return res
        .status(400)

        .json({ success: false, message: "Mobile and password are required" });
    }

    // Check if user exists
    const user = await userModel.findOne({ mobile });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        mobile: user.mobile,
        email: user.email,
        address: user.address,
        role: user.role,
      },
    });
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error logging in user" });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { userId, oldPassword, newPassword } = req.body;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashPassword;

    await user.save();

    res.json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const { id } = req.params; // Admin ID

    const users = await userModel.find({
      createdBy: id,
      role: "0",
    });

    res.status(200).json({
      success: true,
      users,
      totalUsers: users.length,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    // check user exist or not
    const userExist = await userModel.findById(userId);
    if (!userExist) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const user = await userModel.findByIdAndDelete(userId);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
