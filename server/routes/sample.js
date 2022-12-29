const express = require("express");
const router = express.Router();
const { sampleGet, sampleData, getSampleID } = require("../controllers/sample");
// const {
//   getAllTasks,
//   createTask,
//   getTask,
//   updateTask,
//   deleteTask,
//   editTask,
// } = require("../controllers/tasks");

router.route("/").get(sampleGet).post(sampleGet);
router.route("/data").get(sampleData);
router.route("/data/:id").get(getSampleID);
// router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;
