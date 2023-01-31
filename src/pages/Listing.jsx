
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase';
import { useState } from 'react';
import { Spinner } from '../component/Spinner';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination,EffectFade,Autoplay} from 'swiper';
import {FaShare} from "react-icons/fa";
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
    <Swiper slidesPerView={1} navigation pagination={{type:"progressbar"}} effect="fade" modules={[EffectFade]} autoplay={{delay:600}}>
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
   </main>
  )
}
export default Listing;
