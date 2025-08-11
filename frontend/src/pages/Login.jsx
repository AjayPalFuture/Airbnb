import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import {useNavigate} from 'react-router-dom'
import { useContext, useState } from "react";
import axios from "axios";
import { authDataContext } from "../Context/authContext.jsx";
import { userDataContext } from "../Context/UserContext.jsx";

const Login = () => {
  let Navigate = useNavigate();

   const {serverUrl} = useContext(authDataContext);
  
  let [email, setEmail] = useState("");
  let [name, setName] = useState("");
  let {userData,setUserData}=useContext(userDataContext)
  let [password, setPassword] = useState("");
   const handleLogin=async(e)=>{
    try {
      e.preventDefault();
      let result =await axios.post(serverUrl + "/api/auth/login", {
       name, 
      email,
      password ,
      },{withCredentials: true});
      setUserData(result.data.user)
      Navigate("/")
      console.log(result.data);
    } catch (error) {
      console.error("Error during signup:", error);
    }
   }

  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center relative" >
      <div className="w-[50px] h-[50px] bg-[red] cursor-pointer absolute top-[10%] left-[20px] rounded-[50%] flex items-center justify-center "
      onClick={()=>Navigate("/")}><FaArrowLeftLong className="w-[25px] h-[25px] text-[white]"/></div>
      <form action="" className="max-w-[900px] w-[90%] h-[600px]
      flex items-center justify-center  border-[1px] border-black-600  rounded-2xl shadow-lg  flex-col md:item-start gap-[10px]"onSubmit={handleLogin}>
        <h1 className="text-[35px] text-black-200 font-serif font-semibold w-[90%]   text-3xl  shadow-[inset_4px_4px_8px_rgba(0,0,0,0.3)] px-6 py-2 rounded-lg">Welcome To Airbnb</h1>
       

         <div className=" w-[90%] flex items-start justify-start flex-col gap-[10px]">
          <label htmlFor="email" className="font-medium font-serif text-xl">Email</label>
          <input type="email" placeholder="Enter your email" id="email" className=" shadow-[inset_4px_4px_8px_rgba(0,0,0,0.3)] h-[50px] w-[90%] p-3  rounded-lg text-[18px] focus:outline-none focus:ring-0"required onChange={(e)=>setEmail(e.target.value)} value={email} />
        </div>

         <div className=" w-[90%] flex items-start justify-start flex-col gap-[10px]">
          <label htmlFor="password" className="font-medium font-serif text-xl">Password</label>
          <input type="password" placeholder="Enter your username" id="password" className="shadow-[inset_4px_4px_8px_rgba(0,0,0,0.3)] h-[50px] w-[90%] p-3   rounded-lg text-[18px] focus:outline-none focus:ring-0"required onChange={(e)=>setPassword(e.target.value)} value={password} />
        </div>
        <button className="px-[50px]  py-[10px] bg-red-600 text-white rounded-md mt-10 shadow-lg font-semibold text-[18px] md: px-[100px]">Login</button>
        <p>Create a New account? <span className="text-[19px] text-[red] cursor-pointer "onClick={()=>Navigate("/signup")}>SignUp</span></p>
      </form>

    </div>
  );
};

export default Login;
