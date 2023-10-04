const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
require("express-async-errors");



const register = require("./src/backend/routes/auth");
const login = require("./src/backend/routes/auth");

const getAllJobs = require("./src/backend/routes/jobs");
const getSingleJobs = require("./src/backend/routes/jobs");
const createJobs = require("./src/backend/routes/jobs");
const updateJobs = require("./src/backend/routes/jobs");
const deleteJobs = require("./src/backend/routes/jobs");

const notFoundMiddleware = require("./src/backend/middlewares/not-found");

app.use(cors());
app.use(express.json())

app.get("/", (req, res) => {
  res.send("<h1>Hello Vawkei, How can we help you today </h1>");
});

app.use("/api/v1/auth", register);

app.use("/api/v1/auth", login);

app.use("/api/v1/jobs", getAllJobs);
app.use("/api/v1/jobs/:id", getSingleJobs);
app.use("/api/v1/jobs", createJobs);
app.use("/api/v1/jobs/:id", updateJobs);
app.use("/api/v1/jobs/:id", deleteJobs);

app.use(notFoundMiddleware);

const start = async()=>{
    await mongoose.connect(process.env.MONGODB_URI)
    app.listen(5000,"localhost",()=>{
        console.log("it's on");
        console.log("connected to DB");
        console.log("Server listening on port 5000");
    })
};

start();

// app.listen(5000, "localhost", () => {
//   console.log("it's on");
//   console.log("Server listening on port 5000");
// });
