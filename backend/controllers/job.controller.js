const JobService = require("../services/job.service");

exports.getJobs = async (req, res) => {
  let param = {};
  if (req.body.description) {
    param.description = req.body.description;
  }
  if (req.body.location) {
    param.location = req.body.location;
  }
  if (req.body.isFullTime) {
    param.full_time = req.body.isFullTime;
  }
  if (req.body.page) {
    param.page = req.body.page;
  }
  const jobs = await JobService.findJobs(param);
  return res.json({
    data: jobs,
    message: "Jobs Retrieved Successfully.",
  });
};

exports.getJob = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: "ID is required." });
  }
  const job = await JobService.findJobById(req.params.id ?? "");
  return res.json({
    data: job,
    message: "Job Retrieved Successfully.",
  });
};
