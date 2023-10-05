const Jobs = require("../models/jobs");

const getAllJobs = async (req, res) => {
  const { name, email, password } = req.body;

  const jobs = await Jobs.find({ createdBy: req.user.userId }).sort(
    "-createdAt"
  );
  //console.log(jobs)
  res
    .status(200)
    .json({ jobs: jobs, user: req.user.name, nbhits: jobs.length });
};

const getSingleJob =async (req, res) => {
  
  try{
    const jobId = req.params.id;
    const userId = req.user.userId;

    const job =await Jobs.findOne({_id:jobId,createdBy:userId})
    if(!job){
      return res.status(404).json({msg:`Job id:${id} is not available`})
    }
    res.status(200).json(job)
  }catch(error){
    res.status(500).json(error)
  }
  
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  //console.log(req.body);
  try {
    const { company, position } = req.body;
    if (!company || !position) {
      return res.status(401).json({ msg: "Inputs should'nt be EMPTEA!!!" });
    }
    const job = await Jobs.create(req.body);
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.user.userId;
    const company = req.body.company;
    const position = req.body.position;
    //console.log({jobId,userId})

    if(!company || !position){
      return res.status(401).json({msg:"Inputs can't be empty"})
    }
    const job = await Jobs.findOneAndUpdate({_id: jobId, createdBy:userId }, req.body, {
      new: true,
      runValidators:true
    });
    if(!job){
     return res.status(404).json({msg:`job with id:${jobId} doesn't exist.`})
    }
    res.status(200).json(job)
  } catch (error) {
    res.status(500).json(error);
  }

};

const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.user.userId;

    const job = await Jobs.findOneAndRemove({ _id: jobId, createdBy: userId });
    if (!job) {
      return res
        .status(401)
        .json({ msg: `Job with id: ${jobId} doesn't exist` });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { getAllJobs, getSingleJob, createJob, updateJob, deleteJob };

//console.log(req.headers)

//res.send("<h1>Get all jobs</h1>")
// res.status(200).json({token:token,user:decoded.name})
