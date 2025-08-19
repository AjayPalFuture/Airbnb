import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "./AuthContext.jsx";
import { useNavigate } from "react-router-dom";


export const ListingDataContext = createContext();

const ListingContext = ({ children }) => {
  let navigate = useNavigate();
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [frontEndImage1, setFrontEndImage1] = useState(null);
  let [frontEndImage2, setFrontEndImage2] = useState(null);
  let [frontEndImage3, setFrontEndImage3] = useState(null);
  let [backEndImage1, setBackEndImage1] = useState(null);
  let [backEndImage2, setBackEndImage2] = useState(null);
  let [backEndImage3, setBackEndImage3] = useState(null);
  let [city, setCity] = useState("");
  let [rent, setRent] = useState("");
  let [landMark, setLandMark] = useState("");
  let [category, setCategory] = useState("");
  let [adding, setAdding] = useState(false);
  let [updating, setUpdating] = useState(false);
  let [deleting, setDeleting] = useState(false);
  let [listingData, setListingData] = useState([]);
  let [newListData, setNewListData] = useState([]);
  let { serverUrl } = useContext(authDataContext);
  let [cardDetails,setCardDetails]=useState(null)

  const handleAddListing = async () => {
    setAdding(true);
    try {
      let formData = new FormData();
      formData.append("title", title);
      formData.append("image1", backEndImage1);
      formData.append("image2", backEndImage2);
      formData.append("image3", backEndImage3);
      formData.append("description", description);
      formData.append("rent", rent);
      formData.append("city", city);
      formData.append("landMark", landMark);
      formData.append("category", category);

      let result = await axios.post(serverUrl + "/api/listing/add", formData, {
        withCredentials: true,
      });
      setAdding(false);
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
      setCategory("");
    } catch (error) {
      setAdding(false);
      console.log(error);
    }
  };

  const handleViewCard=async (id) => {
    try {
       let result=await axios.get(serverUrl +`/api/listing/findlistingByid/${id}`,{withCredentials:true})
       setCardDetails(result.data)
       navigate("/viewCard")
    } catch (error) {
      console.log(error)
    }
    
  }

  const getListing = async () => {
    try {
      let result = await axios.get(serverUrl +"/api/listing/get", {
        withCredentials: true,
      });
      console.log(result.data)
      setListingData(result.data);
      setNewListData(result.data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListing();
  }, [adding,updating,deleting]);

  let value = {
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
    listingData,
    setListingData,
    getListing,
    updating,setUpdating,
    deleting,setDeleting,
    newListData, 
    setNewListData,
    handleViewCard,
    cardDetails,
    setCardDetails
  };
  return (
   
      <ListingDataContext.Provider value={value}>
        {children}
      </ListingDataContext.Provider>
    
  );
};

export default ListingContext;
