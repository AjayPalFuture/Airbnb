import React, { useContext, useState } from "react";
import {useNavigate} from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";
import { authDataContext } from "../Context/authContext.jsx";
import axios from "axios";
import { userDataContext } from "../Context/UserContext.jsx";
const Signup = () => {
  let Navigate = useNavigate();
  const {serverUrl} = useContext(authDataContext);
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let {userData,setUserData}=useContext(userDataContext)
  let [password, setPassword] = useState("");
  let {loading,setLoading}=useContext(authDataContext)
   const handleSignUp=async(e)=>{
    setLoading(true)
    try {
      e.preventDefault();
      let result =await axios.post(serverUrl + "/api/auth/signup", {
      name,
      email,
      password ,
      },{withCredentials: true});
      setLoading(false)
       setUserData(result.data)
       Navigate("/")    
       console.log(result);
    } catch (error) {
      setLoading(false)
      console.error("Error during signup:", error);
    }
   }
  return (
    <div className="w-full h-full flex items-center justify-center">
         <div className="w-[50px] h-[50px] bg-[red] cursor-pointer absolute top-[10%] left-[20px] rounded-[50%] flex items-center justify-center "
            onClick={()=>Navigate("/")}><FaArrowLeftLong className="w-[25px] h-[25px] text-[white] "/></div>
      <form action="" className="max-w-[900px] w-[90%] h-[600px] mt-[50px]
      flex items-center justify-center  border-[1px] border-black-600  rounded-2xl shadow-lg  flex-col md:item-start gap-[10px] " onSubmit={handleSignUp}>
        <h1 className="text-[35px] text-black-200 font-serif font-semibold w-[90%]   text-3xl  shadow-[inset_4px_4px_8px_rgba(0,0,0,0.3)] px-6 py-2 rounded-lg">Welcome To Airbnb</h1>
        <div className="w-[90%] flex items-start justify-start flex-col gap-[10px] mt-[30px]">
          <label htmlFor="name" className="font-medium text-xl font-serif">Username</label>
          <input type="text" placeholder="Enter your username" id="name" className=" h-[50px] w-[90%] p-3 border-none
          shadow-[inset_4px_4px_8px_rgba(0,0,0,0.3)]  focus:outline-none focus:ring-0 rounded-lg text-[18px]" required onChange={(e)=>setName(e.target.value)}
          value={name} />
        </div>

         <div className=" w-[90%] flex items-start justify-start flex-col gap-[10px]">
          <label htmlFor="email" className="font-medium font-serif text-xl">Email</label>
          <input type="email" placeholder="Enter your email" id="email" className=" shadow-[inset_4px_4px_8px_rgba(0,0,0,0.3)] h-[50px] w-[90%] p-3  rounded-lg text-[18px] focus:outline-none focus:ring-0" required onChange={(e)=>setEmail(e.target.value)}
          value={email}/>
        </div>

         <div className=" w-[90%] flex items-start justify-start flex-col gap-[10px]">
          <label htmlFor="password" className="font-medium font-serif text-xl">Password</label>
          <input type="password" placeholder="Enter your username" id="password" className="shadow-[inset_4px_4px_8px_rgba(0,0,0,0.3)] h-[50px] w-[90%] p-3   rounded-lg text-[18px] focus:outline-none focus:ring-0"required onChange={(e)=>setPassword(e.target.value)}
          value={password} />
        </div>
        <button className="px-[50px]  py-[10px] bg-red-600 text-white rounded-md mt-10 shadow-lg font-semibold text-[18px] md:` px-[100px]" disabled={loading}>{loading?"Loading......":"SignUp"}</button>
        <p>Already have an account? <span className="text-[19px] text-[red] cursor-pointer "  onClick={()=>Navigate("/login")}>Login</span></p>
      </form>

    </div>
  );
};

export default Signup;
