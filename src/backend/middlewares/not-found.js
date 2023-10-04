const NotFound = (req,res)=>{
    return res.status(404).send("<h1>This Route Does not Exist</h1>")
};

module.exports = NotFound;