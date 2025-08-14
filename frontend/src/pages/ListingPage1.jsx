import React, { useContext } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { ListingDataContext } from "../Context/listingContext";

const ListingPage1 = () => {
  let navigate = useNavigate();
  let{
      title,setTitle,
    description, setDescription,
    frontEndImage1,setFrontEndImage1,
    frontEndImage2,setFrontEndImage2,
    frontEndImage3,setFrontEndImage3,
    backEndImage1,setBackEndImage1,
    backEndImage2,setBackEndImage2,
    backEndImage3,setBackEndImage3,
    rent,setRent,
    city,setCity,
    landMark,setLandMark,
    category,setCategory,
  }=useContext(ListingDataContext)

  const handleImage1=(e)=>{
    let file = e.target.files[0]
    setBackEndImage1(file)
    setFrontEndImage1(URL.createObjectURL(file))
  }

   const handleImage2=(e)=>{
    let file = e.target.files[0]
    setBackEndImage2(file)
    setFrontEndImage2(URL.createObjectURL(file))
  }

   const handleImage3=(e)=>{
    let file = e.target.files[0]
    setBackEndImage3(file)
    setFrontEndImage3(URL.createObjectURL(file))
  }
  return (
    <div className="w-[100%] h-[100%] bg-white flex items-center justify-center relative overflow-auto">
      <form
        action=""
        className="max-w-[900px] w-[90%] h-[550px] flex items-center  justify-start flex-col mt-[150px] md:items-start gap-[10px] overflow-auto"
        onSubmit={(e)=>{e.preventDefault()
          navigate("/listingpage2")}
        }  >
        <div
          className="w-[50px] h-[50px] bg-[red] cursor-pointer absolute top-[5%] left-[20px] rounded-[50%] flex items-center justify-center "
          onClick={() => navigate("/")}
        >
          <FaArrowLeftLong className="w-[25px] h-[25px] text-[white]" />
        </div>
        <div className="w-[200px] h-[50px] text-[20px] bg-[#f14242] text-white flex items-center justify-center rounded-[30px] absolute top-[5%] right-[10px] shadow-lg">
          {" "}
          Set Your Home
        </div>
        <div className=" w-[90%] flex items-start justify-start flex-col gap-[10px]">
          <label htmlFor="title" className="font-medium font-serif text-xl">
            Title
          </label>
          <input
            type="text"
            id="title"
            className=" shadow-[inset_4px_4px_8px_rgba(0,0,0,0.3)] h-[50px] w-[90%] p-3  rounded-lg text-[18px] focus:outline-none focus:ring-0"
            required onChange={(e)=>setTitle(e.target.value)} value={title}
          />
        </div>

        <div className=" w-[90%] flex items-start justify-start flex-col gap-[10px]">
          <label htmlFor="des" className="font-medium font-serif text-xl">
            Description
          </label>
          <textarea
            id="des"
            className=" shadow-[inset_4px_4px_8px_rgba(0,0,0,0.3)] h-[80px] w-[90%] p-3  rounded-lg text-[18px] focus:outline-none focus:ring-0"
            required onChange={(e)=>setDescription(e.target.value)} value={description}
          ></textarea>
        </div>

        <div className=" w-[90%] flex items-start justify-start flex-col gap-[10px]">
          <label htmlFor="img1" className="font-medium font-mono text-xl">
            Image1
          </label>
          <input
            type="file"
            id="img1"
            className=" shadow-[inset_4px_4px_8px_rgba(0,0,0,0.3)] h-[50px] w-[90%] p-3  rounded-lg text-[18px] focus:outline-none focus:ring-0"
            required onChange={handleImage1}
          /> 
        </div>

        <div className=" w-[90%] flex items-start justify-start flex-col gap-[10px]">
          <label htmlFor="img2" className="font-medium font-mono text-xl">
            Image2
          </label>
          <input
            type="file"
            id="img2"
            className=" shadow-[inset_4px_4px_8px_rgba(0,0,0,0.3)] h-[50px] w-[90%] p-3  rounded-lg text-[18px] focus:outline-none focus:ring-0"
            required onChange={handleImage2}
          />
        </div>

        <div className=" w-[90%] flex items-start justify-start flex-col gap-[10px]">
          <label htmlFor="img3" className="font-medium font-mono text-xl">
            Image3
          </label>
          <input
            type="file"
            id="img3"
            className=" shadow-[inset_4px_4px_8px_rgba(0,0,0,0.3)] h-[50px] w-[90%] p-3  rounded-lg text-[18px] focus:outline-none focus:ring-0"
            required onChange={handleImage3}
          />
        </div>

        <div className=" w-[90%] flex items-start justify-start flex-col gap-[10px]">
          <label htmlFor="rent" className="font-medium font-serif text-xl">
            Rent
          </label>
          <input
            type="text"
            id="rent"
            className=" shadow-[inset_4px_4px_8px_rgba(0,0,0,0.3)] h-[50px] w-[90%] p-3  rounded-lg text-[18px] focus:outline-none focus:ring-0"
            required onChange={(e)=>setRent(e.target.value)} value={rent}
          />
        </div>

        <div className=" w-[90%] flex items-start justify-start flex-col gap-[10px]">
          <label htmlFor="city" className="font-medium font-serif text-xl">
            City
          </label>
          <input
            type="text"
            id="city"
            className=" shadow-[inset_4px_4px_8px_rgba(0,0,0,0.3)] h-[50px] w-[90%] p-3  rounded-lg text-[18px] focus:outline-none focus:ring-0"
            required onChange={(e)=>setCity(e.target.value)} value={city}
          />
        </div>

        <div className=" w-[90%] flex items-start justify-start flex-col gap-[10px]">
          <label htmlFor="landmark" className="font-medium font-serif text-xl">
            LandMark
          </label>
          <input
            type="text"
            id="landmark"
            className=" shadow-[inset_4px_4px_8px_rgba(0,0,0,0.3)] h-[50px] w-[90%] p-3  rounded-lg text-[18px] focus:outline-none focus:ring-0"
            required onChange={(e)=>setLandMark(e.target.value)} value={landMark}
          />
        </div>

        <button className="px-[50px] py-[10px] bg-[red] text-white text-[18px] md:px-[100px] rounded-lg">
          Next
        </button>
      </form>
    </div>
  );
};

export default ListingPage1;
