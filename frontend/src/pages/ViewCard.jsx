import React, { useContext, useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import  { ListingDataContext } from '../Context/listingContext';
import { userDataContext } from '../Context/UserContext';
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';
import { authDataContext } from '../Context/authContext';

const ViewCard = () => {
    let navigate=useNavigate()
    let {cardDetails}=useContext(ListingDataContext)
    let {userData}=useContext(userDataContext)
    let [updaetpopUp,setUpdatePopUp]=useState(false)
      let [title, setTitle] = useState(cardDetails.title);
      let [description, setDescription] = useState(cardDetails.description);
    
      let [backEndImage1, setBackEndImage1] = useState(null);
      let [backEndImage2, setBackEndImage2] = useState(null);
      let [backEndImage3, setBackEndImage3] = useState(null);
      let [city, setCity] = useState(cardDetails.city);
      let [rent, setRent] = useState(cardDetails.rent);
      let [landMark, setLandMark] = useState(cardDetails.landMark);
      let {serverUrl}=useContext(authDataContext)
      let {updating,setUpDating}=useContext(ListingDataContext)
      let {deleting,setDeleting}=useContext(ListingDataContext)
    

    const handleUpdateListing=async () => {
        setUpDating(true)
         try {
      let formData = new FormData();
      formData.append("title", title);
      if(backEndImage1)formData.append("image1", backEndImage1);
      if(backEndImage2)formData.append("image2", backEndImage2);
     if(backEndImage3) formData.append("image3", backEndImage3);
      formData.append("description", description);
      formData.append("rent", rent);
      formData.append("city", city);
      formData.append("landMark", landMark);

      let result = await axios.post(serverUrl +`/api/listing/delete/${cardDetails._id}`, formData, {
        withCredentials: true,
      });
  
      console.log(result);
      navigate("/");
      setTitle("");
      setDescription("");
      setFrontEndImage1(null);
      setFrontEndImage2(null);
      setFrontEndImage3(null);
      setBackEndImage1(null);
      setBackEndImage2(null);
      setBackEndImage3(null);
      setRent("");
      setCity("");
      setLandMark("");
    } catch (error) {
     setUpDating(false)
      console.log(error);
    }
    }

    const handleDeleteListing=async () => {
        setDeleting(true)
        try {
             let result = await axios.delete(serverUrl +`/api/listing/delete/${cardDetails._id}`,  {
        withCredentials: true,
      });
    //   console.log(result.data)
      navigate("/")
      setDeleting(false)
        } catch (error) {
            setDeleting(false)
            console.log(error)
        }
    }


   const handleImage1=(e)=>{
    let file = e.target.files[0]
    setBackEndImage1(file)
  
  }

   const handleImage2=(e)=>{
    let file = e.target.files[0]
    setBackEndImage2(file)
    
  }

   const handleImage3=(e)=>{
    let file = e.target.files[0]
    setBackEndImage3(file)
   
  }
  return (
    <div className="w-[100%] h-[100vh] bg-[white] flex items-center justify-center gap-[10px] flex-col overflow-auto relative">
          <div
            className="w-[50px] h-[50px] bg-[red] cursor-pointer absolute top-[5%] left-[20px] rounded-[50%] flex items-center justify-center "
            onClick={() => navigate("/")}
          >
            <FaArrowLeftLong className="w-[25px] h-[25px] text-[white]" />
          </div>
          <div className="w-[95%] flex items-start justify-start text-[25px] md:w-[80%] mb-[10px]">
            <h1 className="text-[20px] text-[#272727] md:text-[30px] text-ellipsis text-nowrap overflow-hidden px-[70px] md:px-[0px]">
              {`In ${cardDetails.landMark.toUpperCase()}, ${cardDetails.city.toUpperCase()}`}
            </h1>
          </div>
          <div className="w-[95%] h-[400px] flex items-center justify-center flex-col md:w-[80%] md:flex-row">
            <div className="w-[100%] h-[65%] md:w-[70%] md:h-[100%] overflow-hidden flex items-center justify-center border-[2px] border-white">
              <img className="w-[100%]" src={cardDetails.image1} alt="" />
            </div>
            <div className="w-[100%] h-[50%] md:w-[50%] md:h-[100%]  flex items-center justify-center md:flex-col ">
              <div className="w-[100%] h-[100%] overflow-hidden flex items-center justify-center border-[2px] border-white ">
                <img src={cardDetails.image2} alt="" className="w-[100%]" />
              </div>
              <div className="w-[100%] h-[100%] overflow-hidden flex items-center justify-center border-[2px] border-white ">
                <img src={cardDetails.image3} alt="" className="w-[100%]" />
              </div>
            </div>
          </div>
          <div className="w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px]">
            {`${cardDetails.title.toUpperCase()} ${cardDetails.category.toUpperCase()}  ${cardDetails.landMark.toUpperCase()}`}
          </div>
          <div className="w-[95%]  text-gray-800 flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px]">
           {cardDetails.description}
          </div>
          <div className="w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px]">
            {`Rs.${cardDetails.rent}/month`}
          </div>
          <div className="w-[100%] h-[50px] flex items-center justify-around px-[150px]">
           { cardDetails.host==userData._id &&<button
              className="px-[30px] py-[10px] bg-[red] text-white text-[18px] md:px-[100px] rounded-lg text-nowrap"
              onClick={()=>setUpdatePopUp(prev=>!prev)}>
             Edit Listing
            </button>}
             {cardDetails.host!=userData._id &&<button
              className="px-[30px] py-[10px] bg-[red] text-white text-[18px]  md:px-[100px] rounded-lg text-nowrap"
            
            >
             Reserve
            </button>}
          </div>
            {/* update Listing Page  */}
         {updaetpopUp && <div className='w-[100%] h-[100%] flex items-center justify-center bg-[#000000a9] absolute top-[0px] z-[100] backdrop-blur-sm'>
            <RxCross2   className="w-[40px] h-[40px] bg-[red] cursor-pointer text-white absolute top-[5%] left-[20px] rounded-[50%] flex items-center justify-center "
            onClick={() => setUpdatePopUp(false)} />
               <form
                      action=""
                      className="max-w-[900px] text-white w-[90%] h-[550px] flex items-center  justify-start flex-col mt-[100px] md:items-start gap-[10px] overflow-auto bg-[#272727] p-[100px] rounded-lg "onSubmit={(e)=>{e.preventDefault()}}
                       >
                      
                      <div className="w-[200px] h-[50px] text-[20px] bg-[#f14242] text-white flex items-center justify-center rounded-[30px] absolute top-[5%] right-[10px] shadow-lg">
                        {" "}
                        Update Your Home
                      </div>
                      <div className=" w-[90%] flex items-start justify-start flex-col gap-[10px]">
                        <label htmlFor="title" className="font-medium font-serif text-xl">
                          Title
                        </label>
                        <input
                          type="text"
                          id="title"
                          className="text-black shadow-[inset_4px_4px_8px_rgba(0,0,0,0.3)] h-[50px] w-[90%] p-3  rounded-lg text-[18px] focus:outline-none focus:ring-0"
                          required  onChange={(e)=>setTitle(e.target.value)} value={title}
                        />
                      </div>
              
                      <div className=" w-[90%] flex items-start justify-start flex-col gap-[10px]">
                        <label htmlFor="des" className="font-medium font-serif text-xl">
                          Description
                        </label>
                        <textarea
                          id="des"
                          className="text-black shadow-[inset_4px_4px_8px_rgba(0,0,0,0.3)] h-[80px] w-[90%] p-3  rounded-lg text-[18px] focus:outline-none focus:ring-0"
                          required  onChange={(e)=>setDescription(e.target.value)} value={description}
                        ></textarea>
                      </div>
              
                      <div className=" w-[90%] flex items-start justify-start flex-col gap-[10px]">
                        <label htmlFor="img1" className="font-medium font-mono text-xl">
                          Image1
                        </label>
                        <input
                          type="file"
                          id="img1"
                          className=" bg-white text-black shadow-[inset_4px_4px_8px_rgba(0,0,0,0.3)] h-[50px] w-[90%] p-3  rounded-lg text-[18px] focus:outline-none focus:ring-0"
                          required  onChange={handleImage1}
                        /> 
                      </div>
              
                      <div className=" w-[90%] flex items-start justify-start flex-col gap-[10px]">
                        <label htmlFor="img2" className="font-medium font-mono text-xl">
                          Image2
                        </label>
                        <input
                          type="file"
                          id="img2"
                          className=" bg-white text-black  shadow-[inset_4px_4px_8px_rgba(0,0,0,0.3)] h-[50px] w-[90%] p-3  rounded-lg text-[18px] focus:outline-none focus:ring-0"
                          required  onChange={handleImage2}
                        />
                      </div>
              
                      <div className=" w-[90%] flex items-start justify-start flex-col gap-[10px]">
                        <label htmlFor="img3" className="font-medium font-mono text-xl">
                          Image3
                        </label>
                        <input
                          type="file"
                          id="img3"
                          className=" bg-white text-black  shadow-[inset_4px_4px_8px_rgba(0,0,0,0.3)] h-[50px] w-[90%] p-3  rounded-lg text-[18px] focus:outline-none focus:ring-0"
                          required   onChange={handleImage3}
                        />
                      </div>
              
                      <div className=" w-[90%] flex items-start justify-start flex-col gap-[10px]">
                        <label htmlFor="rent" className="font-medium font-serif text-xl">
                          Rent
                        </label>
                        <input
                          type="text"
                          id="rent"
                          className="text-black shadow-[inset_4px_4px_8px_rgba(0,0,0,0.3)] h-[50px] w-[90%] p-3  rounded-lg text-[18px] focus:outline-none focus:ring-0"
                          required  onChange={(e)=>setRent(e.target.value)} value={rent}
                        />
                      </div>
              
                      <div className=" w-[90%] flex items-start justify-start flex-col gap-[10px]">
                        <label htmlFor="city" className="font-medium font-serif text-xl">
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          className="text-black shadow-[inset_4px_4px_8px_rgba(0,0,0,0.3)] h-[50px] w-[90%] p-3  rounded-lg text-[18px] focus:outline-none focus:ring-0"
                          required   onChange={(e)=>setCity(e.target.value)} value={city}
                        />
                      </div>
              
                      <div className=" w-[90%] flex items-start justify-start flex-col gap-[10px]">
                        <label htmlFor="landmark" className="font-medium font-serif text-xl">
                          LandMark
                        </label>
                        <input
                          type="text"
                          id="landmark"
                          className="text-black shadow-[inset_4px_4px_8px_rgba(0,0,0,0.3)] h-[50px] w-[90%] p-3  rounded-lg text-[18px] focus:outline-none focus:ring-0"
                          required  onChange={(e)=>setLandMark(e.target.value)} value={landMark}
                        />
                      </div>
              <div className='w-[100%] flex items-center justify-center mt-[30px] gap-[20px]'>
                      <button className="px-[10px] text-nowrap py-[10px] bg-[red] text-white text-[15px] md:text-[18px] md:px-[100px] rounded-lg mt-[30px]" onClick={handleUpdateListing} disabled={updating}>
                        {updating?"updating.......":"Update Listing"}
                      </button>
                      <button className="px-[10px] text-nowrap py-[10px] bg-[red] text-white text-[15px] md:text-[18px] md:px-[100px] rounded-lg mt-[30px]"onClick={handleDeleteListing} disabled={deleting} >
                      {deleting?"Deleting.......":"Delete Listing"}
                      </button>
                      </div>
                    </form>
          </div>}
        </div>
  )
}

export default ViewCard
