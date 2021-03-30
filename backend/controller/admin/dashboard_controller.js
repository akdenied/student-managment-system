const moment = require("moment");
const { BAD_REQUEST, OK } = require("http-status");
const { Branch } = require("../../model/Branch");
const { Semester } = require("../../model/Semester");
const { User } = require("../../model/User");

exports.getAdminDashboard = async (req, res, next) => {
  let semester = await Semester.find();
  let branch = await Branch.find();
  let teachers = await User.find({ role: "teacher" }).sort("createdAt");
  let students = await User.find({ role: "student" }).sort("createdAt");

  return res.status(OK).send({
    code: OK,
    data: {
      teachers: {
        count: teachers.length,
      },
      students: {
        count: students.length,
      },
      semesters: {
        count: semester.length,
      },
      branchs: {
        count: branch.length,
      },
    },
    message: ["Dashboard Details."],
  });
};