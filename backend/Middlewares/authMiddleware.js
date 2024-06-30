import { decodeToken } from "../utilities/jwt.js";

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  
  if (typeof authHeader !== "undefined") {
    const token = authHeader.split(' ')[1];
   
    try {
      const userName = await decodeToken(token);

      if (userName) {
        // Ensure req.user is initialized
        req.user = req.user || {};
        req.user.username = userName;
        next();
      } else {
        res.status(403).send("Forbidden entry");
      }
    } catch (error) {
      // Handle possible errors from decodeToken function
      res.status(401).send("Invalid token");
    }
  } else {
    res.status(401).send("Authorization header is missing");
  }
};
