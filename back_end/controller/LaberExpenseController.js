import laberExpenseModel from '../models/LaberExpencesModel.js'
import Attendance from '../models/attendanceModel.js';
import User from '../models/userModel.js';
import Site from '../models/SiteModel.js';
export const laberExpenses = async (req, res) => {
    try {
        const {
            siteId,
            laberId,
            date,       // sirf "YYYY-MM-DD" aayega frontend se
            Amount,
            description
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
            description
        });

        res.status(201).json({
            success: true,
            message: "Attendance added successfully",
            attendance
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getExpense = async (req, res) => {
  try {

    const expenses = await laberExpenseModel
      .find()
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
            { new: true }
        );
        res.status(200).send({ message: "Expense updated successfully", expense: updatedExpense });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteLaberExpense = async (req, res) => {
    try {
        const { laberId } = req.params;
        const deletedExpense = await laberExpenseModel.findOneAndDelete({ laberId });
        res.status(200).send({ message: "Expense deleted successfully", expense: deletedExpense });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Finle Sheet Calculation like Attendance, Expense, Material, Labour, etc. for a specific site and date range exel sheet


export const finalSheet = async (req, res) => {
  try {
    const attendance = await Attendance.aggregate([
      {
        $group: {
          _id: {
            siteId: "$siteId",
            laberId: "$laberId",
          },

          // Attendance Count
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

          // Rate
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

    const result = await Promise.all(
      attendance.map(async (item) => {
        // Expense
        const expense = await laberExpenseModel.aggregate([
          {
            $match: {
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

        // User
        const laber = await User.findById(item._id.laberId);

        // Site
        const site = await Site.findById(item._id.siteId);

        // Amount
        const thandiAmount =
          item.thandiAttendance * item.thandiRate;

        const garamAmount =
          item.garamAttendance * item.garamRate;

        const totalIncome =
          thandiAmount + garamAmount;

        const baki =
          totalIncome - totalExpense;

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

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
