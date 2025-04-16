// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// const SECRET = process.env.SECRET_KEY;

// function authMiddleware(req, res, next) {
//     const authHeader = req.headers.authorization;
//     const token = authHeader && authHeader.split(" ")[1];
  
//     if (!token) return res.status(401).json({ message: "Brak tokenu" });
  
//     try {
//       const data = jwt.verify(token, SECRET);
//       req.user = data;
//       next();
//     } catch {
//       res.status(403).json({ message: "Token nieprawidłowy" });
//     }
//   }

// module.exports = authMiddleware;

const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const SECRET = process.env.SECRET_KEY;

async function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Brak tokenu" });

    try {
        const data = jwt.verify(token, SECRET);

        // Pobierz użytkownika z bazy po loginie
        const user = await User.findOne({ nickname: data.login });

        if (!user) {
            return res.status(401).json({ message: "Użytkownik nie znaleziony" });
        }

        req.user = user;
        next();
    } catch {
        res.status(403).json({ message: "Token nieprawidłowy" });
    }
}

module.exports = authMiddleware;
