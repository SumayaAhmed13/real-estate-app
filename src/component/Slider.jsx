import { collection, query,orderBy, limit, getDocs} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Spinner } from "../component/Spinner";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination,EffectFade,Autoplay} from 'swiper';
import 'swiper/css/bundle';
 const Slider = () => {
  const[listings,setListings]=useState(null);
  const[loading,setLoading]=useState(true);
  const navigate=useNavigate();
  SwiperCore.use([Autoplay,Navigation,Pagination])
  useEffect(()=>{
       const fetchListings= async()=>{
        const listingsRef = collection(db, "listings");
        const q = query(listingsRef, orderBy("timestamp", "desc"), limit(5));
        const querySnap = await getDocs(q);
        let listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListings(listings);
        setLoading(false);
       }

       fetchListings() 
  },[])
  if(loading){
      return <Spinner/>
  }
  if(listings.length === 0){
    return <></>
  }
  return (
   listings && (
    <>
    <Swiper slidesPerView={1} navigation pagination={{type:"progressbar"}} effect="fade" modules={[EffectFade]} autoplay={{delay:3000}}>
      {listings.map(({data, id })=>(
        <SwiperSlide key={id} onClick={()=>navigate(`/category/${data.type}/${id}`)}>
           <div
                style={{
                  background: `url(${data.imgUrls[0]}) center, no-repeat`,
                  backgroundSize: "cover",
                }}
                className="relative w-full h-[300px] overflow-hidden"
              ></div>
              <p className=" absolute text-[#f1faee] left-1 top-3 font-medium bg-[#457b9d] max-w-[100%] shadow-lg opacity-90 rounded-br-3xl p-2">{data.name}</p>
              <p className=" absolute text-[#f1faee] left-1 bottom-3 bg-[#e63946] max-w-[90%] shadow-lg opacity-90 rounded-tr-3xl font-semibold p-2"> BDT {data.discountedPrice ?? data.regularPrice} {data.type==="rent" && " /month"}</p>
        </SwiperSlide>
   
       ))}
    </Swiper>
    </> 
   )
  )
}
export default Slider;
