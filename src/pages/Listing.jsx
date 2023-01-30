
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase';
import { useState } from 'react';
import { Spinner } from '../component/Spinner';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination,EffectFade,Autoplay} from 'swiper';
import 'swiper/css/bundle';
 const  Listing= () => {
  const params=useParams();
  const [listing,setListing]=useState(null);
  const [loading,setLoading]=useState(true);


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
    <Swiper slidesPerView={1} navigation pagination={{type:"progressbar"}} effect="fade" modules={[EffectFade]} autoplay={{delay:500}}>
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
   </main>
  )
}
export default Listing;
