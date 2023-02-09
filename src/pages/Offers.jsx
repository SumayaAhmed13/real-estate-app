import { collection, getDocs, limit, orderBy, query, startAfter, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { Spinner } from '../component/Spinner';
import ListingItem from "../component/ListingItem";
const Offers=()=> {
  const [listings,setListing]=useState(null);
  const [loading,setLoading]=useState(true);
  const [lastFetchData,setLastFetchData]=useState(null);
  useEffect(()=>{
    const fetchListing= async()=>{
      try{
         const listingRef=collection(db,"listings");
         const q = query(listingRef,where("offer","==",true),orderBy("timestamp","desc"),limit(8));
         const snapData= await getDocs(q);
         const lastVisiable=snapData.docs[snapData.docs.length - 1];
         setLastFetchData(lastVisiable);
         const listing=[];
         snapData.forEach((doc)=>{
          return listing.push({
            id:doc.id,
            data:doc.data()
          })

         })

       setListing(listing);
       setLoading(false);
      }
      catch(error){
        toast.error("Something Went Wrong");
      }

    }
    fetchListing()
  },[])
  if (loading) {
    return <><Spinner /> && <p>No Data Found</p></> ;
  }
  const onMoreData= async()=>{
    try{
      const listingRef=collection(db,"listings");
      const q = query(listingRef,where("offer","==",true),orderBy("timestamp","desc"),startAfter(lastFetchData),limit(4));
      const snapData= await getDocs(q);
      const lastVisiable=snapData.docs[snapData.docs.length - 1];
      setLastFetchData(lastVisiable);
      const listing=[];
      snapData.forEach((doc)=>{
       return listing.push({
         id:doc.id,
         data:doc.data()
       })

      })

    setListing((preState) => [...preState,...listing]);
    setLoading(false);
   }
   catch(error){
     toast.error("Something Went Wrong");
   }
  }
  return (
    <div className="max-w-6xl mx-auto px-3">
      <h1 className=" text-center text-3xl font-bold mt-6 mb-6">Offers</h1>
      {
        !loading && listings.length>0 &&(
          <>
          <main>
            <ul className=" sm:grid sm:grid-cols-2 lg:grid-col-3 xl:grid-cols-4">
                    {listings.map((listing)=>(
                        <ListingItem key={listing.id} listing={listing.data} id={listing.id} /> 

                    ))}
                </ul>
          </main>
          {lastFetchData && (
            <div className=" flex justify-center items-center">
               <button onClick={onMoreData} className=" bg-white mb-6 mt-6 px-3 py-1.5 text-gray-700 border
                border-gray-600 hover:border-slate-600 rounded transition duration-150 ease-in-out">See More</button>
            </div>
          )}
          </>
        )
      }
    </div>
  )
}
export default Offers;