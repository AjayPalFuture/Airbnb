import { json } from "express";
import uploadOnCloudinary from "../config/cloudinary.js";
import Listing from "../model/listing_model.js";
import User from "../model/user_model.js";

export const addListing = async (req, res) => {
    try {
        const host = req.userId;
        const { title, description, rent, city, landMark, category } = req.body;

        if (!title || !description || !rent || !city || !landMark || !category) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (!req.files || !req.files.image1 || !req.files.image2 || !req.files.image3) {
            return res.status(400).json({ message: "All 3 images are required" });
        }

        // Upload images to Cloudinary
        const image1 = await uploadOnCloudinary(req.files.image1[0].path);
        const image2 = await uploadOnCloudinary(req.files.image2[0].path);
        const image3 = await uploadOnCloudinary(req.files.image3[0].path);

        // Create listing
        const listing = await Listing.create({
            title,
            description,
            rent,
            city,
            landMark,
            category,
            image1,
            image2,
            image3,
            host
        });

        // Add listing to user
        const user = await User.findByIdAndUpdate(
            host,
            { $push: { listing: listing._id } },
            { new: true }
        ).populate("listing");  

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(201).json({
            message: "Listing added successfully",
            listing
        });

    } catch (error) {
        console.error("AddListing Error:", error);
        return res.status(500).json({ message: `AddListing error: ${error.message}` });
    }
};



export const getListing =async(req,res)=>{
    try {
        let listing = await Listing.find().sort({createdAt:-1})
        // console.log(await Listing.find())
      return  res.status(200).json(listing)
    } catch (error) {
       return  res.status(500).json({message:`getListing error ${error}`})
    }
}


export const findListing=async (req,res) => {
    try {
        let {id}=req.params
        //   console.log("Backend received id:", id);
        let listing=await Listing.findById(id)
        if(!listing){
         return   res.status(404).json({message:"listing not found"})
        }
      return  res.status(200).json(listing)
    } catch (error) {
      return  res.status(500).json({message:`findlisting error ${error}`})
    }
}

export const updateListing=async (req,res) => {
    try {
         const {id} = req.params;
        const { title, description, rent, city, landMark, category } = req.body;

        if (!title || !description || !rent || !city || !landMark ) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (!req.files || !req.files.image1 || !req.files.image2 || !req.files.image3) {
            return res.status(400).json({ message: "All 3 images are required" });
        }

        // Upload images to Cloudinary
        let image1;
        let image2;
        let image3;
        if(req.files.image1){
         image1 = await uploadOnCloudinary(req.files.image1[0].path);
        }
        if(req.files.image2){
         image2 = await uploadOnCloudinary(req.files.image2[0].path);
        }
        if(req.files.image3){
         image3= await uploadOnCloudinary(req.files.image3[0].path);
        }
        // Create listing
        const listing = await Listing.findByIdAndUpdate(id,{
            title,
            description,
            rent,
            city,
            landMark,
            category,
            image1,
            image2,
            image3,
        },{new:true});

      

        return res.status(201).json({
            message: "Listing updated successfully",
            listing
        });

    } catch (error) {
        return res.status(500).json({message:`updateError ${error}`})
    }
}

export  const deleteListing=async (req,res) => {
    try {
        let {id}=req.params
        let listing=await Listing.findByIdAndDelete(id);
        let user=await User.findByIdAndUpdate(listing.host,{$pull:{listing:listing._id}},{new:true});
        if(!user){
            return res.status(404).json({message:"user is not found"})
        }
        return res.status(201).json({message:"Listing Deleted"})
    } catch (error) {
        return res.status(500).json({message:`Listing  Deleted Error ${error}`})
    }
}





