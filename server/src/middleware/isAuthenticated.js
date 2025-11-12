const { jwtSecret } = require("../api/dotenv");

const isAuthenticated = async (req, res, next) => {
  try {
    let tokenString = req.headers.authorization;
    let tokenArray = tokenString.split(" ");
    let token = tokenArray[1];
    // console.log(token);
    //now, we need to verify the token

    let userTokenVerified = await jwt.verify(token, jwtSecret);
    req._id = userTokenVerified.id;

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = isAuthenticated;
