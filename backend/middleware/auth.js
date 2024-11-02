import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    // Check if the token is present in the headers
    const token = req.headers.token;

    // If no token is provided, respond with a 401 Unauthorized status
    if (!token) {
        return res.status(401).json({ success: false, message: "Not Authorized. Please log in again." });
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_Secret);

        req.body.userId = token_decode.id;

        next();
    } catch (error) {
        console.error(error); 
        res.status(403).json({ success: false, message: "Invalid token. Access denied." });
    }
};

export default authMiddleware;
