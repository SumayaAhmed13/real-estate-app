
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import Slider from "../component/Slider";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import ListingItem from "../component/ListingItem";

const  Home=()=>{
  //offers
  const [offerListings,setOfferListings]=useState(null);
  useEffect(()=>{
       const fetchListings=async()=>{
        try
        {
          //get referance
          const refListing = collection(db,"listings");
          //create the query
          const q = query(refListing,where("offer","==",true),orderBy("timestamp","desc"),limit(4));
          //execute the query
          const querySnap = await getDocs(q);
          const listing = [];
          querySnap.forEach((doc)=>{
            return listing.push({
               id:doc.id,
               data:doc.data()
              })
          })
          setOfferListings(listing);
          console.log(listing);
        }
        catch(error){
            console.log(error);
        }
      
       }
       fetchListings()
  },[])
  //rent
  const [rentListings,setRentListings]=useState(null);
  useEffect(()=>{
       const fetchListings=async()=>{
        try
        {
          //get referance
          const refListing = collection(db,"listings");
          //create the query
          const q = query(refListing,where("type","==","rent"),orderBy("timestamp","desc"),limit(4));
          //execute the query
          const querySnap = await getDocs(q);
          const listing = [];
          querySnap.forEach((doc)=>{
            return listing.push({
               id:doc.id,
               data:doc.data()
              })
          })
          setRentListings(listing);
          console.log(listing);
        }
        catch(error){
            console.log(error);
        }
      
       }
       fetchListings()
  },[])
  //Sale
  const [saleListings,setSaleListings]=useState(null);
  useEffect(()=>{
       const fetchListings=async()=>{
        try
        {
          //get referance
          const refListing = collection(db,"listings");
          //create the query
          const q = query(refListing,where("type","==","sale"),orderBy("timestamp","desc"),limit(4));
          //execute the query
          const querySnap = await getDocs(q);
          const listing = [];
          querySnap.forEach((doc)=>{
            return listing.push({
               id:doc.id,
               data:doc.data()
              })
          })
          setSaleListings(listing);
          console.log(listing);
        }
        catch(error){
            console.log(error);
        }
      
       }
       fetchListings()
  },[])
  return (
    <div><Slider/>
      <div className=" max-w-6xl mx-auto pt-4 space-y-6">
       {offerListings && offerListings.length > 0 &&(
          <div className=" m-2 mb-3" >
            <h1 className=" px-3 text-2xl mt-6 font-semibold">Recent Offers</h1>
              <Link to="/offers">
                <p className=" px-3 text-sm text-blue-500 hover:text-blue-800 transition duration-150 ease-in-out">Show more offers</p>
              </Link>
                <ul className=" sm:grid sm:grid-cols-2 lg:grid-col-3 xl:grid-cols-4">
                    {offerListings.map((listing)=>(
                        <ListingItem key={listing.id} listing={listing.data} id={listing.id} /> 

                    ))}
                </ul>
          </div>
        )}
         {rentListings && rentListings.length > 0 &&(
          <div className=" m-2 mb-3" >
            <h1 className=" px-3 text-2xl mt-6 font-semibold">Places for rent</h1>
              <Link to="/category/rent">
                <p className=" px-3 text-sm text-blue-500 hover:text-blue-800 transition duration-150 ease-in-out">Show more places for rent</p>
              </Link>
                <ul className=" sm:grid sm:grid-cols-2 lg:grid-col-3 xl:grid-cols-4">
                    {rentListings.map((listing)=>(
                        <ListingItem key={listing.id} listing={listing.data} id={listing.id} /> 

                    ))}
                </ul>
          </div>
        )}
          {saleListings && saleListings.length > 0 &&(
          <div className=" m-2 mb-3" >
            <h1 className=" px-3 text-2xl mt-6 font-semibold">Places for Sale</h1>
              <Link to="/category/sale">
                <p className=" px-3 text-sm text-blue-500 hover:text-blue-800 transition duration-150 ease-in-out">Show more places for Sale</p>
              </Link>
                <ul className=" sm:grid sm:grid-cols-2 lg:grid-col-3 xl:grid-cols-4">
                    {saleListings.map((listing)=>(
                        <ListingItem key={listing.id} listing={listing.data} id={listing.id} /> 

                    ))}
                </ul>
          </div>
        )}
      </div>
    </div>
  )
}
export default Home;
