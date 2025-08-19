import User from "../model/user_model.js";
export const  getCurrentUser = async(req, res) => {
    try {
        let user=await User.findById(req.userId).select("-password ").populate("listing"," _id title image1 image2 image3 description rent category city landMark")
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
       return res.status(200).json({message:"User found",user});
    } catch (error) {
       return res.status(500).json({message:"Error fetching user",error: error.message});
    }
}