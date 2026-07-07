import laberExpenseModel from "../models/LaberExpencesModel.js";
import Attendance from "../models/attendanceModel.js";
import User from "../models/userModel.js";
import Site from "../models/SiteModel.js";
import mongoose from "mongoose";
export const laberExpenses = async (req, res) => {
  try {
    const {
      siteId,
      laberId,
      date, // sirf "YYYY-MM-DD" aayega frontend se
      Amount,
      description,
    } = req.body;

    // frontend se aayi date ke saath server ka current time combine karo
    const now = new Date();
    const selectedDate = new Date(date);
    selectedDate.setHours(now.getHours(), now.getMinutes(), now.getSeconds());

    const attendance = await laberExpenseModel.create({
      siteId,
      laberId,
      date: selectedDate,
      Amount,
      description,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Attendance added successfully",
      attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getExpense = async (req, res) => {
  try {
   const  id  = req.user.id;
    const expenses = await laberExpenseModel
      .find({createdBy:id})
      .populate("laberId", "name fatherName")
      .populate("siteId", "siteName");

    res.status(200).json({
      success: true,
      expenses: expenses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// update expense
export const updateLaberExpense = async (req, res) => {
  try {
    const { laberId } = req.params;
    const { Amount, date, description } = req.body;
    const updatedExpense = await laberExpenseModel.findOneAndUpdate(
      { laberId },
      { Amount, date, description },
      { new: true },
    );
    res.status(200).send({
      message: "Expense updated successfully",
      expense: updatedExpense,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteLaberExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await laberExpenseModel.findByIdAndDelete(id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Expense deleted successfully",
      expense,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Finle Sheet Calculation like Attendance, Expense, Material, Labour, etc. for a specific site and date range exel sheet



export const finalSheet = async (req, res) => {
  try {
    const  id  = req.user.id;

    // Attendance (Only Logged-in Admin)
    const attendance = await Attendance.aggregate([
      {
        $match: {
          createdBy: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $group: {
          _id: {
            siteId: "$siteId",
            laberId: "$laberId",
          },

          thandiAttendance: {
            $sum: {
              $cond: [{ $eq: ["$type", "0"] }, 1, 0],
            },
          },

          garamAttendance: {
            $sum: {
              $cond: [{ $eq: ["$type", "1"] }, 1, 0],
            },
          },

          thandiRate: {
            $max: {
              $cond: [{ $eq: ["$type", "0"] }, "$rate", 0],
            },
          },

          garamRate: {
            $max: {
              $cond: [{ $eq: ["$type", "1"] }, "$rate", 0],
            },
          },
        },
      },
    ]);

    // Today Expense
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const todayExpense = await laberExpenseModel.aggregate([
      {
        $match: {
          createdBy: new mongoose.Types.ObjectId(id),
          date: {
            $gte: startOfDay,
            $lte: endOfDay,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalExpense: {
            $sum: "$Amount",
          },
        },
      },
    ]);

    const totalTodayExpense =
      todayExpense.length > 0 ? todayExpense[0].totalExpense : 0;

    // Final Sheet
    const result = await Promise.all(
      attendance.map(async (item) => {
        const expense = await laberExpenseModel.aggregate([
          {
            $match: {
              createdBy: new mongoose.Types.ObjectId(id),
              siteId: item._id.siteId,
              laberId: item._id.laberId,
            },
          },
          {
            $group: {
              _id: null,
              totalExpense: {
                $sum: "$Amount",
              },
            },
          },
        ]);

        const totalExpense =
          expense.length > 0 ? expense[0].totalExpense : 0;

        const laber = await User.findById(item._id.laberId);

        const site = await Site.findById(item._id.siteId);

        const thandiAmount =
          item.thandiAttendance * item.thandiRate;

        const garamAmount =
          item.garamAttendance * item.garamRate;

        const totalIncome = thandiAmount + garamAmount;

        const baki = totalIncome - totalExpense;

        return {
          siteId: item._id.siteId,
          laberId: item._id.laberId,

          siteName: site?.siteName || "",
          laberName: laber?.name || "",
          fatherName: laber?.fatherName || "",

          thandiAttendance: item.thandiAttendance,
          garamAttendance: item.garamAttendance,

          thandiRate: item.thandiRate,
          garamRate: item.garamRate,

          thandiAmount,
          garamAmount,

          totalIncome,
          totalExpense,
          baki,
        };
      })
    );

    // Totals
    const totals = result.reduce(
      (acc, item) => {
        acc.thandiAttendance += item.thandiAttendance;
        acc.garamAttendance += item.garamAttendance;
        acc.totalIncome += item.totalIncome;
        acc.totalExpense += item.totalExpense;
        acc.baki += item.baki;

        return acc;
      },
      {
        thandiAttendance: 0,
        garamAttendance: 0,
        totalIncome: 0,
        totalExpense: 0,
        baki: 0,
      }
    );

    res.status(200).json({
      success: true,
      data: result,
      todayTotalExpense: totalTodayExpense,
      totals,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};