import React, { useContext } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { ListingDataContext } from "../Context/listingContext";

const ListingPage3 = () => {
  let navigate = useNavigate();

  let {
    title,
    setTitle,
    description,
    setDescription,
    frontEndImage1,
    setFrontEndImage1,
    frontEndImage2,
    setFrontEndImage2,
    frontEndImage3,
    setFrontEndImage3,
    backEndImage1,
    setBackEndImage1,
    backEndImage2,
    setBackEndImage2,
    backEndImage3,
    setBackEndImage3,
    rent,
    setRent,
    city,
    setCity,
    landMark,
    setLandMark,
    category,
    setCategory,
    handleAddListing,
    adding,
    setAdding,
  } = useContext(ListingDataContext);
  return (
    <div className="w-[100%] h-[100vh] bg-[white] flex items-center justify-center gap-[10px] flex-col overflow-auto relative">
      <div
        className="w-[50px] h-[50px] bg-[red] cursor-pointer absolute top-[5%] left-[20px] rounded-[50%] flex items-center justify-center "
        onClick={() => navigate("/listingpage2")}
      >
        <FaArrowLeftLong className="w-[25px] h-[25px] text-[white]" />
      </div>
      <div className="w-[95%] flex items-start justify-start text-[25px] md:w-[80%] mb-[10px]">
        <h1 className="text-[20px] text-[#272727] md:text-[30px] text-ellipsis text-nowrap overflow-hidden">
          {`In ${landMark.toUpperCase()}, ${city.toUpperCase()}`}
        </h1>
      </div>
      <div className="w-[95%] h-[400px] flex items-center justify-center flex-col md:w-[80%] md:flex-row">
        <div className="w-[100%] h-[65%] md:w-[70%] md:h-[100%] overflow-hidden flex items-center justify-center border-[2px] border-white">
          <img className="w-[100%]" src={frontEndImage1} alt="" />
        </div>
        <div className="w-[100%] h-[50%] md:w-[50%] md:h-[100%]  flex items-center justify-center md:flex-col ">
          <div className="w-[100%] h-[100%] overflow-hidden flex items-center justify-center border-[2px] border-white ">
            <img src={frontEndImage2} alt="" className="w-[100%]" />
          </div>
          <div className="w-[100%] h-[100%] overflow-hidden flex items-center justify-center border-[2px] border-white ">
            <img src={frontEndImage3} alt="" className="w-[100%]" />
          </div>
        </div>
      </div>
      <div className="w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px]">
        {`${title.toUpperCase()} ${category.toUpperCase()}  ${landMark.toUpperCase()}`}
      </div>
      <div className="w-[95%]  text-gray-800 flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px]">
        {`${description.toUpperCase()}`}
      </div>
      <div className="w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px]">
        {`Rs.${rent}/month`}
      </div>
      <div className="w-[100%] h-[50px] flex items-center justify-start px-[150px]">
        <button
          className="px-[50px] py-[10px] bg-[red] text-white text-[18px] md:px-[100px] rounded-lg"
          onClick={handleAddListing}
          disabled={adding}
        >
          {adding ?   "adding..."  :  "Adding Listing"}
        </button>
      </div>
    </div>
  );
};

export default ListingPage3;
