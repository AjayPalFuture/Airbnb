import React, { useContext } from "react";
import Nav from "../Component/Nav.jsx";
import { ListingDataContext } from "../Context/listingContext.jsx";
import Card from "../Component/Card.jsx";
const Home = () => {
  let { listingData, setListingData,newListData,setNewListData } = useContext(ListingDataContext);
  return (
    <div>
      <Nav />

      <div className="w-[100%] h-[77vh] flex items-center justify-center gap-[25px] flex-wrap mt-[250px] md:mt-[180px]">
        {/* {console.log(newListData)} */}
        {newListData.map((list) => (
          <Card
          key={list._id}
            title={list.title}
            landMark={list.landMark}
            image1={list.image1}
            image2={list.image2}
            image3={list.image3}
            rent={list.rent}
            city={list.city}
            id={list._id}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
