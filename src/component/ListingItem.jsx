/* eslint-disable react/jsx-no-comment-textnodes */
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
const ListingItem = ({listing,id}) => {
  return (
    <li className=" relative bg-white flex flex-col justify-between items-center shadow-md hover:shadow-xl rounded-md overflow-hidden transition-shadow duration-150 m-[10px]">
      <Link className=" contents" to={`/category/${listing.type}/${id}`}>
       <img className=" h-[170px] w-full object-cover hover:scale-105 transition-scale duration-200 ease-in"
        src={listing.imgUrls[0]} loading="lazy" alt="" />
       <Moment fromNow className="absolute top-2 left-2 bg-[#3377cc] uppercase px-2 py-1 rounded-md font-semibold text-xs shadow-lg text-white">{listing.timestamp?.toDate()}</Moment>
      <div className=" w-full p-[10px]">
        <div className=" flex items-center space-x-1">
        <MdLocationOn className=" h-4 w-4 text-green-600"/>
        <p className=" font-semibold text-gray-600 text-sm mb-[2px] truncate">{listing.address}</p>
        </div>
        <p className=" font-semibold mt-0 text-xl">{listing.name}</p>
        <p className=" text-[#457b9d] text-lg font-semibold"> BDT {listing.offers? listing.discountedPrice.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  :listing.regularPrice.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  {listing.type==='rent' && '/month'}
                  </p>

        <div className="flex items-center mt-[5px] space-x-3">
         <div className="flex items-center space-x-1">
          <p className=" font-bold text-xs">{listing.bedrooms>1?`${listing.bedrooms} Beds`:'Bed'}</p>
          
         </div>
         <div className="flex items-center space-x-1">
          <p className="font-bold text-xs">{listing.bathrooms>1?`${listing.bathrooms} Baths`:'Bath'}</p>
         </div>
       </div>
       </div>
     
      </Link>
    </li>
    
    
  )
}
export default ListingItem;
