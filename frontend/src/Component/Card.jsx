import React, { useContext } from "react";
import { userDataContext } from "../Context/UserContext";
import { ListingDataContext } from "../Context/listingContext";
import { useNavigate } from "react-router-dom";

const Card = ({ id, title, landMark, image1, image2, image3, rent, city }) => {
  let navigate=useNavigate()
  let {userData}=useContext(userDataContext)
  let  {handleViewCard}=useContext(ListingDataContext)
  const handleClick=()=>{
    if(userData){
    handleViewCard(id)
    }
    else{
        navigate("/login")
    }
  }
  return (
    <div className="w-[330px] h-[460px] max-w-[85%] flex justify-start items-start flex-col rounded-lg mt-10 cursor-pointer " onClick={handleClick}>
      {/* Image Scroll Section */}
      <div className="w-full h-[67%] rounded-lg overflow-x-scroll flex scrollbar-hide ">
        {[image1, image2, image3].map((img, index) =>
          img ? (
            <img
              key={index}
              src={img}
              alt={`listing-${index}`}
              className="w-full h-full object-cover flex-shrink-0"
            />
          ) : null
        )}
      </div>

      {/* Details Section */}
      <div className="w-full h-[33%] py-5 flex flex-col gap-1">
        <span className="w-[80%] truncate text-[#4a3434] font-semibold">
          In {landMark?.toUpperCase()}, {city?.toUpperCase()}
        </span>

        <span className="w-[80%] truncate text-[16px] font-bold">
          {title?.toUpperCase()}
        </span>

        <span className="text-[16px] font-semibold text-[#986b6b]">
          Rs. {rent}/month
        </span>
      </div>
    </div>
  );
};

export default Card;


