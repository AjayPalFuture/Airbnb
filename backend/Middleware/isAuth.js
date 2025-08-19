
import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
    try {
        // JWT cookie ka naam "token" rakha hai
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token found" });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded.userId) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }

        // Set userId in request for later use
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error("Auth Error:", error);
        res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    }
};

export default isAuth;
