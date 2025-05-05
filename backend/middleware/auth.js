const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "testKey";

function verifyToken(req, res, next) {
    //make sure authHeader is present and correctly formatted
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Token missing or malformed" });
    }
    //extract token
    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
    

}

module.exports = verifyToken;