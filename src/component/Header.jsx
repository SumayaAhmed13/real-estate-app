import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import Logo from '../Asset/Img/Logo.jpg'

const Header=()=>{
    const location=useLocation();
    const navigate=useNavigate();
    const [pageStatus,setPageStatus]=useState("Sign In");
    const auth=getAuth();
    useEffect(()=>{
     onAuthStateChanged(auth,(user)=>{
       if(user){
        setPageStatus("Profile")
       }
       else{
        setPageStatus("Sign In")
       }
     })

    },[auth]);
    function currentLocation (route){
        if(route === location.pathname){
              return true;
        }
    }

  return (
    <div className=' bg-white border-b shadow-sm sticky top-0 z-40'>
       <header className=' flex justify-between items-center px-3 max-w-6xl mx-auto'>
           <div>
             <img src={Logo} alt="Company Logo" className='h-7 cursor-pointer' onClick={()=>navigate("/")}/>
           </div>
            <div>
                 <ul className=' flex space-x-10'>
                    <li className={` cursor-pointer py-3 text-sm font-semibold text-gray-500 border-b-4 border-b-transparent ${currentLocation("/")
                && " text-black border-b-blue-400 "}`} onClick={()=>navigate("/")}>Home</li>
                    <li className={` cursor-pointer py-3 text-sm font-semibold text-gray-500 border-b-4 border-b-transparent ${currentLocation("/offers")
                && " text-black border-b-blue-400 "}`} onClick={()=>navigate("/offers")}>Offers</li>
                    <li className={` cursor-pointer py-3 text-sm font-semibold text-gray-500 border-b-4 border-b-transparent ${(currentLocation("/sign-in") || currentLocation("/profile"))
                && "text-black border-b-blue-400 "}`} onClick={()=>navigate("/profile")}>{pageStatus}</li>
            
                 </ul>
            </div>
        </header>
    </div>
   
   
  )
}
export default Header