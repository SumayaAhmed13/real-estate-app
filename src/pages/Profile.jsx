import { getAuth, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { collection, doc, getDocs, orderBy, query, updateDoc, where} from 'firebase/firestore';
import { db } from '../firebase';
import {FcHome} from 'react-icons/fc';
import  ListingItem  from "../component/ListingItem";


const Profile=()=> {
  const auth=getAuth();
  const [listing,setListing]=useState(null);
  const [loading,setLoading]=useState(true);
  const[fromData,setFromData]=useState({
    name:auth.currentUser.displayName,
    email:auth.currentUser.email
  })
  const {name,email}=fromData;
  const [changeDetail,setChangeDetail]=useState(false);
  const navigate=useNavigate();
  const onSingOut=()=>{
    const auth=getAuth();
    auth.signOut();
    navigate("/");
}

const onChangeHandler=(e)=>{
  setFromData((preStatus)=>({
      ...preStatus,
      [e.target.id]:e.target.value

  }))
}
const onSubmitHandler=async()=>{
  try {
    //update display name in firebase auth
    if(auth.currentUser.displayName!==name){
      await updateProfile(auth.currentUser,{
          displayName:name,
      })
      //update name in firestore
      const docRef=doc(db,"users",auth.currentUser.uid);
      await updateDoc(docRef,{name})
    }
      
    toast.success("Profile Details Update Successfully");
  } catch (error) {
    toast.error("Could not update your Profile Details");
    
  }

}
useEffect(()=>{
  async function fetchUserListing(){
    const listingRef=collection(db,"listings");
    const q=query(listingRef,where("userRef","==",auth.currentUser.uid),
    orderBy("timestamp","desc")
    );
    const querySnap=await getDocs(q);
    let listing=[];
    querySnap.forEach((doc)=>{
   return listing.push({
     id:doc.id,
     data:doc.data()
   })
    })
    setListing(listing);
    setLoading(false);
  }
 fetchUserListing();
},[auth.currentUser.uid])
  return (
    <>
    <section className=" max-w-6xl mx-auto flex justify-center items-center flex-col">
      <h1 className="text-3xl text-center mt-6 font-bold">My Profile</h1>
      <div className=" w-full md:w-[50%] mt-6 px-3">
        <from>
          <input type="text" id="name" value={name} disabled={!changeDetail} className={`w-full py-2 px-4 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out mb-6 ${changeDetail && "bg-red-400 focus:bg-red-200"}`} onChange={onChangeHandler}/>

          <input type="email" id="email" value={email} disabled className="w-full py-2 px-4 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out mb-6"/>

          <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
            <p className=" flex items-center ">Do you want to change Name?<span className=" text-red-500 hover hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer" onClick={()=>{changeDetail && onSubmitHandler();
            setChangeDetail((preDetail)=>!preDetail)
            }}>{changeDetail?"Apply Change":"Edit"}</span></p>
            <p className=" text-blue-600 hover:text-blue-800 transition duration-200 cursor-pointer" onClick={onSingOut}>Sign Out</p>
          </div>
        </from>
        <button type="submit" className=" w-full bg-blue-400 text-white uppercase px-7 py-3 text-sm font-semibold rounded shadow-md hover:bg-blue-600 duration-150 transition ease-in-out hover:shadow-lg active:bg-blue-800">
          <Link to="/create-listing" className=" flex justify-center items-center">
          <FcHome className=" mr-2 text-3xl bg-red-400 rounded-full p-1 border-2"/>
            Sell/Rent Your Home
          </Link>
       
        </button>
      </div>
    </section>
    <div className=" max-w-6xl px-3 mt-6 mx-auto">
      {
        !loading && listing.length>0 && (
            <>
            <h2 className="text-3xl text-center font-bold">My Listing</h2>
            <ul>
              {listing.map((listing)=>(<ListingItem key={listing.id} id={listing.id} listing={listing.data}/>))}
            </ul>
            </>

        )
      }
    </div>
    </>
  )
}
export default Profile;
