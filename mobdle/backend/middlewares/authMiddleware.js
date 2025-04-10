const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET = process.env.SECRET_KEY;

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN
  
    if (!token) return res.status(401).json({ message: "Brak tokenu" });
  
    try {
      const data = jwt.verify(token, SECRET);
      req.user = data;
      next();
    } catch {
      res.status(403).json({ message: "Token nieprawidłowy" });
    }
  }

module.exports = authMiddleware;