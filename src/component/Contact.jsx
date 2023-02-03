import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
const Contact = ({useRef,listing}) => {
    const [owerContact,setOwerContact]=useState(null);
    const [message,setMessage]=useState("");
    useEffect(()=>{
      const fetchContactOwer= async()=>{
        const docRef=doc(db,"users",useRef);
        const docSnap=await getDoc(docRef);
        if(docSnap.exists()){
            setOwerContact(docSnap.data())
        }
        else{
            toast.error("Could not found data")
        }
      }

      fetchContactOwer()
    },[useRef]);
    const onChange=(e)=>{
   
     setMessage(e.target.value);
    }
  return (
    <>{owerContact !==null && 
       (
       <div className=" flex flex-col w-full">
        <p> <span className=" font-semibold"> Contact:</span> {owerContact.name} for the {listing.name.toLowerCase()}</p>
        <div className=" mt-3 mb-6">
            <textarea name="message" value={message} id="message" rows="2" onChange={onChange} className=" w-full px-4 py-2 text-2xl text-gray-300 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-gray-100 focus:text-gray-600"></textarea>
        </div>
        <a href={`mailto:${owerContact.email}?Subject=${listing.name}&body=${message}`} alt="">
          <button type="button" className=" px-7 py-3 bg-blue-600 text-white rounded text-sm uppercase shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg transition duration-150 ease-in-out w-full text-center mb-6">Send Message</button>
        </a>
        
     
       </div>
    
       
       ) 
    }</>
  )
}
export default Contact;

