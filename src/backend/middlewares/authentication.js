const jwt = require("jsonwebtoken");

const authenticationMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ msgOne: "You are not permitted to view this route" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_II);
    req.user = { userId: decoded._id, name: decoded.name, token: token };
    next();
  } catch (error) {
    res
      .status(401)
      .json({ msg: "Authentication invalid. " });
  }
};

module.exports = authenticationMiddleware;
