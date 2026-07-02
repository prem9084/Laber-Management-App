import laberAttendenceModel from '../models/attendanceModel.js'
import laberExpenseModel from '../models/LaberExpencesModel.js'
// Get All Attendence

export const getMyAllAttendence = async (req, res) => {
  try {
    const userId = req.user.id; // JWT se

    const attendence = await laberAttendenceModel
      .find({ laberId: userId })
      .sort({ date: -1 })
      .populate("laberId", "name fatherName")
      .populate("siteId", "siteName");

    res.status(200).send({success:true,attendance: attendence,totalAttendance: attendence.length});
  } catch (error) {
    res.status(500).send({success:false,message: error.message});
  }
};

// for get my expences 

export const getMyAllExpenses = async (req, res) => {
  try {
    const userId = req.user.id;

    const expenses = await laberExpenseModel
      .find({ laberId: userId })
      .sort({ date: -1 })
      .populate("laberId", "name fatherName")
      .populate("siteId", "siteName");

    // Total Expense
    const totalExpense = expenses.reduce(
      (sum, item) => sum + Number(item.Amount || 0),
      0
    );

    // Today's Date
    const today = new Date().toDateString();

    // Today's Expense
    const todayExpense = expenses
      .filter(
        (item) => new Date(item.date).toDateString() === today
      )
      .reduce((sum, item) => sum + Number(item.Amount || 0), 0);

    res.status(200).send({
      success: true,
      expenses,
      totalExpense,
      todayExpense,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};