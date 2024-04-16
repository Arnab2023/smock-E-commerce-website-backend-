const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const validateSubscriber = asyncHandler(async (req, res, next) => {
  try {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
      console.log(token);
      if (!token) {
        res.status(401);
        throw new Error("Admin is not authorized or token is missing");
      }
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          res.status(401);
          throw new Error("User is not authorized");
        }
        console.log(decoded.subscriber.id);
        req.subid = decoded.subscriber.id; // Assuming subscriber id is stored in decoded token
        next();
      });
    } else {
      res.status(401);
      throw new Error("Bearer token is missing");
    }
  } catch (error) {
    console.log(error.message);

    res.status(400).json({ message: "maa chud gayi" });
  }
});

module.exports = validateSubscriber;
