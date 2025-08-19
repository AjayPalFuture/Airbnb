import React, { useContext } from "react";
import logo from "../assets/airbnb-logo.png";
import { IoSearch } from "react-icons/io5";
import { MdWhatshot } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { GiFamilyHouse } from "react-icons/gi";
import { MdBedroomParent } from "react-icons/md";
import { MdOutlinePool } from "react-icons/md";
import { GiWoodCabin } from "react-icons/gi";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { IoBedOutline } from "react-icons/io5";
import { FaTreeCity } from "react-icons/fa6";
import { BiBuildingHouse } from "react-icons/bi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../Context/authContext.jsx";
import axios from "axios";
import { userDataContext } from "../Context/UserContext.jsx";
import { ListingDataContext } from "../Context/listingContext.jsx";

const Nav = () => {
  let [showpopup, setShowpopup] = useState(false);
  let { userData, setUserData } = useContext(userDataContext);
  let navigate = useNavigate();
  let { serverUrl } = useContext(authDataContext);
  let [cate, setCate] = useState();
  let { listingData, setListingData, newListData, setNewListData } =
    useContext(ListingDataContext);

  const handleLogOut = async () => {
    try {
      let result = await axios.post(
        serverUrl + "/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      setUserData(null);
      // console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategory = (category) => {
    setCate(cate);
    if (category == "trending") {
      setNewListData(listingData);
    } else {
      setNewListData(listingData.filter((list) => list.category == category));
    }
  };

  return (
    <div className="fixed top-0">
      <div className="w-[100vw] min-h-[80px] bg-black  border-b-[1px] text-white border-[#dcdcdc] px-[40px] flex items-center justify-between md:px-[40px]">
        <div>
          <img src={logo} alt="" className="w-[130px]" />
        </div>
        <div className="w-[35%] relative hidden md:block ">
          <input
            type="text"
            className="w-[100%] px-[30px] py-[10px] border-[2px] border-[#f50606] outline-none overflow-auto
        rounded-[30px] text-[17px] "
            placeholder="Any Where | Any Location | Any City"
          />
          <button className="absolute p-[10px] rounded-[50px] bg-[red] text-[white] right-[3%] top-[5px] ">
            <IoSearch className="w-[20px] h-[20px]" />
          </button>
        </div>
        <div className="flex items-center justify-center gap-[10px] relative">
          <span
            className="text-[18px] cursor-pointer rounded-[50px] bg-red-500  border-white border-2 hover:bg-[#f40404] px-[8px] py-[5px] md:block hidden"
            onClick={() => navigate("/listingpage1")}
          >
            List Your Home
          </span>
          <button
            className="px-[20px] py-[10px] flex items-center justify-center gap-[5px] border-[2px] border-[#fffcfc] rounded-[50px] hover:shadow-lg "
            onClick={() => setShowpopup((prev) => !prev)}
          >
            <span>
              <GiHamburgerMenu className="w-[20px] h-[20px]" />
            </span>
            {!userData && (
              <span>
                <CgProfile className="w-[25px] h-[25px]" />
              </span>
            )}
            {userData?.name ? (
              <span className="w-[30px] h-[30px] bg-[#080808] text-white font-bold text-[20px]  rounded-full flex items-center justify-center">
                {userData.name.slice(0, 1).toUpperCase()}
              </span>
            ) : null}
          </button>
          {showpopup && (
            <div className="w-[220px] h-[250px] absolute text-black bg-slate-50 top-[110%] right-[5%] md:right-[10%] border-[1px] border-[#aaa9a9] z-10 rounded-lg">
              <ul className="w-[100%] h-[100%] text-[17px] flex items-start justify-around flex-col py-[10px]">
                {!userData && (
                  <li
                    className="w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer"
                    onClick={() => {
                      navigate("/login");
                      setShowpopup(false);
                    }}
                  >
                    Login
                  </li>
                )}
                {userData && (
                  <li
                    className="w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer"
                    onClick={() => {
                      handleLogOut();
                      setShowpopup(false);
                    }}
                  >
                    Logout
                  </li>
                )}
                <div className="w-[100%] h-[1px] bg-[#c1c0c0]"></div>
                <li
                  className="w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer"
                  onClick={() => {
                    navigate("/listingpage1");
                    setShowpopup(false);
                  }}
                >
                  List your Home
                </li>
                <li className="w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer"onClick={() => {
                    navigate("/mylisting");
                    setShowpopup(false);
                  }}>
                  My Listing
                </li>
                <li className="w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer">
                  {" "}
                  Check Booking
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className=" w-[100%]  flex items-center justify-center h-[60px] block md:hidden ">
        <div className="w-[80%] relative">
          <input
            type="text"
            className="w-[100%] px-[30px] py-[10px] border-[2px] border-[#bdbaba] outline-none overflow-auto
        rounded-[30px] text-[17px] "
            placeholder="Any Where | Any Location | Any City"
          />
          <button className="absolute p-[10px] rounded-[50px] bg-[red] text-[white] right-[3%] top-[5px] ">
            <IoSearch className="w-[20px] h-[20px]" />
          </button>
        </div>
      </div>
      <div className="w-[100vw] h-[85px] bg-white flex items-center justify-start cursor-pointer gap-[40px] overflow-auto md:justify-center px-[15px] ">
        <div
         className={`flex items-center justify-center flex-col hover:border-b-[2px] border-[#bdbcbc] text-[13px] ${cate === "trending" ? "border-b-[2px] border-[#a6a5a5]" : "border-b-[2px] border-transparent hover:border-[#bdbcbc]"}`}
          onClick={() => {
            handleCategory("trending");
            setCate("");
          
          }}
        >
          <MdWhatshot className="w-[30px] h-[30px] text-black" />
          <h3 className="font-semibold">Trending</h3>
        </div>

        <div
           className={`flex items-center justify-center flex-col hover:border-b-[2px] border-[#bdbcbc] text-[13px] ${cate === "villa" ? "border-b-[2px] border-[#a6a5a5]" : "border-b-[2px] border-transparent hover:border-[#bdbcbc]"}`}
          onClick={() => handleCategory("villa")}
        >
          <GiFamilyHouse className="w-[30px] h-[30px] text-black" />
          <h3 className="font-semibold">Villa</h3>
        </div>

        <div
         className={`flex items-center justify-center flex-col hover:border-b-[2px] border-[#bdbcbc] text-[13px] ${cate === "farmHouse" ? "border-b-[2px] border-[#a6a5a5]" : "border-b-[2px] border-transparent hover:border-[#bdbcbc]"}`}
          onClick={() => handleCategory("farmHouse")}
        >
          <FaTreeCity className="w-[30px] h-[30px] text-black" />
          <h3 className="font-semibold">Farm House</h3>
        </div>

        <div
         className={`flex items-center justify-center flex-col hover:border-b-[2px] border-[#bdbcbc] text-[13px] ${cate === "poolHouse" ? "border-b-[2px] border-[#a6a5a5]" : "border-b-[2px] border-transparent hover:border-[#bdbcbc]"}`}
          onClick={() => handleCategory("poolHouse")}
        >
          <MdOutlinePool className="w-[30px] h-[30px] text-black" />
          <h3 className="font-semibold">Pool House</h3>
        </div>

        <div
          className={`flex items-center justify-center flex-col hover:border-b-[2px] border-[#bdbcbc] text-[13px] ${cate === "rooms" ? "border-b-[2px] border-[#a6a5a5]" : "border-b-[2px] border-transparent hover:border-[#bdbcbc]"}`}
          onClick={() => handleCategory("rooms")}
        >
          <MdBedroomParent className="w-[30px] h-[30px] text-black" />
          <h3 className="font-semibold">Rooms</h3>
        </div>

        <div
          className={`flex items-center justify-center flex-col hover:border-b-[2px] border-[#bdbcbc] text-[13px] ${cate === "flat" ? "border-b-[2px] border-[#a6a5a5]" : "border-b-[2px] border-transparent hover:border-[#bdbcbc]"}`}
          onClick={() => handleCategory("flat")}
        >
          <BiBuildingHouse className="w-[30px] h-[30px] text-black" />
          <h3 className="font-semibold">Flat</h3>
        </div>

        <div
          className={`flex items-center justify-center flex-col hover:border-b-[2px] border-[#bdbcbc] text-[13px] ${cate === "pg" ? "border-b-[2px] border-[#a6a5a5]" : "border-b-[2px] border-transparent hover:border-[#bdbcbc]"}`}
          onClick={() => handleCategory("pg")}
        >
          <IoBedOutline className="w-[30px] h-[30px] text-black" />
          <h3 className="font-semibold">PG</h3>
        </div>

        <div
          className={`flex items-center justify-center flex-col hover:border-b-[2px] border-[#bdbcbc] text-[13px] ${cate === "cabin" ? "border-b-[2px] border-[#a6a5a5]" : "border-b-[2px] border-transparent hover:border-[#bdbcbc]"}`}
          onClick={() => handleCategory("cabin")}
        >
          <GiWoodCabin className="w-[30px] h-[30px] text-black" />
          <h3 className="font-semibold">Cabin</h3>
        </div>

        <div
         className={`flex items-center justify-center flex-col hover:border-b-[2px] border-[#bdbcbc] text-[13px] ${cate === "shops" ? "border-b-[2px] border-[#a6a5a5]" : "border-b-[2px] border-transparent hover:border-[#bdbcbc]"}`}
          onClick={() => handleCategory("shops")}
        >
          <SiHomeassistantcommunitystore className="w-[30px] h-[30px] text-black" />
          <h3 className="font-semibold"> Shops</h3>
        </div>
      </div>
    </div>
  );
};

export default Nav;
