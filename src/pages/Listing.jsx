
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase';
import { useState } from 'react';
import { Spinner } from '../component/Spinner';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination,EffectFade,Autoplay} from 'swiper';
import {FaShare,FaMapMarkerAlt,FaBed,FaBath,FaParking} from "react-icons/fa";
import {GiLift}from "react-icons/gi";

import 'swiper/css/bundle';
 const  Listing= () => {
  const params=useParams();
  const [listing,setListing]=useState(null);
  const [loading,setLoading]=useState(true);
  const [linkCopy,setLinkCopy]=useState(false);

  SwiperCore.use([Autoplay,Navigation,Pagination])
  useEffect(() => {
    async function fetchListing() {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      }
    }
    fetchListing();
  },[params.listingId]);
  if (loading) {
    return <Spinner />;
  }
  if(loading){
    <Spinner/>
  }
  return (
    <main>
    <Swiper slidesPerView={1} navigation pagination={{type:"progressbar"}} effect="fade" modules={[EffectFade]} autoplay={{delay:3000}}>
       {listing.imgUrls.map((url,index)=>(
        <SwiperSlide key={index}>
            <div
              className="relative w-full overflow-hidden h-[300px]"
              style={{
                background: `url(${listing.imgUrls[index]}) center no-repeat`,
                backgroundSize: "cover",
              }}
            ></div>
        </SwiperSlide>
       ))}
    </Swiper>
    <div className=' fixed top-[13%] right-[3%] z-10 bg-white cursor-pointer border-2 rounded-full border-gray-400 w-12 h-12 flex justify-center items-center' 
    onClick={()=>{navigator.clipboard.writeText(window.location.href);
    setLinkCopy(true);
    setTimeout(()=>{setLinkCopy(false)},2000);
    }}>
    <FaShare className='text-lg text-slate-400'/>
    </div>
    {linkCopy &&(
      <p className=' fixed top-[23%] right-[5%] z-10 font-semibold border-2 border-gray-200 rounded-md bg-white p-2 text-green-400'>Link Copied</p>
    )}
    <div className=' flex flex-col md:flex-row m-4 max-w-6xl lg:mx-auto p-4 rounded-lg border-3 bg-white shadow-lg lg:space-x-5'>
      <div className='w-full h-[200px] lg-[400px]'>
      <p className=' text-2xl font-bold mb-3 text-blue-900'>
          {listing.name} - BDT {listing.offer?listing.discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","):listing.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} {listing.type==="rent"?" / month":""}
      </p>
      <p className=' flex items-center mb-3 mt-6 font-semibold'>
      <FaMapMarkerAlt className=' mr-1 text-green-600'/>
      {listing.address}
      </p>
       <div className=' flex justify-start items-center space-x-4 w-[75%]'>
        <p className=' bg-red-800 w-full max-w-[200px] font-semibold rounded-md shadow-md p-1 text-white text-center '>{listing.type==="rent"?"Rent":"Sale"}</p>
        {
          listing.offer && (
          <p className=' w-full max-w-[200px] font-semibold text-white text-center bg-green-800 p-1 rounded-md shadow-md'>BDT {(+listing.regularPrice)- (+listing.discountedPrice)} discount </p> 
          
          )
        }
  
       </div>
       <p className='mt-3 mb-3 whitespace-nowrap'><span className=' font-semibold'>Description - </span>{listing.description}</p>
       <ul className=' flex items-center space-x-2 sm:space-x-10 font-semibold text-sm'>
        <li className=' flex items-center'><FaBed className=' text-lg mr-1' /> {+listing.bedrooms>1? `${listing.bedrooms} Beds`:"1 Bed"}</li>
        <li className=' flex items-center'><FaBath className=' text-lg mr-1' /> {+listing.bathrooms>1? `${listing.bathrooms} Baths`:"1 Bath"}</li>
        <li className=' flex items-center'><FaParking className=' text-lg mr-1' /> {listing.parking?"Parking Spot":"No Parking"}</li>
        <li className=' flex items-center'><GiLift className=' text-lg mr-1' /> {listing.lift?"Lift":"No Lift"}</li>
        
       </ul>
      </div>
      <div className=' bg-blue-400 w-full h-[200px] lg-[400px] z-10 overflow-x-hidden'>
      
      </div>
    </div>
   </main>
  )
}
export default Listing;
