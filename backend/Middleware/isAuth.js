import jwt from 'jsonwebtoken';

const isAuth= async (req,res,next) => {
    try {
        let {token} = req.cookies;
        if(!token){
             res.status(401).json({message:"Unauthorized access"});
        }
        let verifyToken= jwt.verify(token, process.env.JWT_SECRET);
        if(!verifyToken){
             res.status(401).json({message:"User  doesn't have a token"});
        }
        req.userId= verifyToken.userId;
        next();
    } catch (error) {
        res.status(500).json({message:"isAuth", error: error.message}); 
    }
}
export default isAuth;