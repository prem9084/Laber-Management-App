import attendenceModel from "../models/attendanceModel.js";
import SiteModel from "../models/SiteModel.js";

export const laberAttendence = async (req, res) => {
  try {
    const { siteId, laberId, date, type, rate, status } = req.body;

    const attendance = await attendenceModel.create({
      siteId,
      laberId,
      date,
      type,
      rate,
      status,
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

export const addSite = async (req, res) => {
  try {
    const { siteName } = req.body;

    const site = await SiteModel.create({
      siteName,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Site Added Successfully",
      site,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllSites = async (req, res) => {
  try {
    const  id  = req.user.id;
    const sites = await SiteModel.find({ createdBy: id });
    res.status(200).send({ success: true, sites });
  } catch (error) {
    console.log(error);
  }
};

export const deleteSite = async (req, res) => {
  try {
    const { id } = req.params;

    const site = await SiteModel.findByIdAndDelete(id);

    if (!site) {
      return res.status(404).json({
        success: false,
        message: "Site not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Site Deleted Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
// get attendance by laberId
export const getLaberAttendence = async (req, res) => {
  try {
    const  id  = req.user.id;
    const { laberId } = req.params;
    const attendance = await attendenceModel.find(id,{ laberId });
    res
      .status(200)
      .send({ message: "Attendance retrieved successfully", attendance });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update attendance
export const updateLaberAttendence = async (req, res) => {
  try {
    const { laberId } = req.params;
    const { date, type, rate, status } = req.body;
    const updatedAttendance = await attendenceModel.findOneAndUpdate(
      { laberId },
      { date, type, rate, status },
      { new: true },
    );
    res
      .status(200)
      .send({
        message: "Attendance updated successfully",
        attendance: updatedAttendance,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete attendance
export const deleteLaberAttendence = async (req, res) => {
  try {
    const { id } = req.params;

    const attendance = await attendenceModel.findByIdAndDelete(id);

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Attendance deleted successfully",
      attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAttendance = async (req, res) => {
  try {
    const  id  = req.user.id;

    const attendance = await attendenceModel
      .find({ createdBy: id })
      .populate("laberId", "name fatherName")
      .populate("siteId", "siteName");

    res.status(200).json({
      success: true,
      attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
