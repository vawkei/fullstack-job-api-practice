const Jobs = require("../models/jobs");

const getAllJobs = async (req, res) => {
  const { name, email, password } = req.body;

  const jobs = await Jobs.find({createdBy:req.user.userId});
  console.log(jobs)

  //res.status(200).json({token:req.user.token,user:req.user.name})
  res.status(200).json({jobs:jobs,user:req.user.name });
};

const getSingleJob = (req, res) => {
  res.send("<h1>Get a single job</h1>");
};

const createJob =async (req, res) => {
  
    
    req.body.createdBy = req.user.userId
    console.log(req.body);
    try {
    const { company, position } = req.body;
    if (!company || !position) {
      return res.status(401).json({ msg: "Inputs should'nt be EMPTEA!!!" });
    }
    const job =await Jobs.create(req.body)
    res.status(201).json(job);
  } catch (error) {
    res.status(401).json({error});
  }

  //res.send("<h1>Create a job</h1>")
};

const updateJob = (req, res) => {
  res.send("<h1>Update a job</h1>");
};

const deleteJob = (req, res) => {
  res.send("<h1>Delete a job</h1>");
};

module.exports = { getAllJobs, getSingleJob, createJob, updateJob, deleteJob };

//console.log(req.headers)

//res.send("<h1>Get all jobs</h1>")
// res.status(200).json({token:token,user:decoded.name})
