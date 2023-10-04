const express = require("express");
const router = express.Router();

const {
  getAllJobs,
  getSingleJob,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobs");

const authMiddleware = require("../middlewares/authentication")


router.get("/", authMiddleware,getAllJobs);

router.get("/:id", authMiddleware,getSingleJob);

router.post("/", authMiddleware,createJob);

router.patch("/:id", authMiddleware,updateJob);

router.delete("/:id", authMiddleware,deleteJob);

module.exports = router;
