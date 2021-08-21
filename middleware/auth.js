const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Get token from header
  const token = req.header("x-auth-token");

  // If no token
  if (!token) {
    return res
      .status(401)
      .json({ success: false, msg: "No Token, authorization denied" });
  }

  try {
    // if token is invalid - verify
    const decoded = jwt.verify(token, process.env.jwtToken);

    // assign verifed token to user
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error("token is invalid");
    res.status(401).json({ success: false, msg: "Token is not valid" });
  }
};
