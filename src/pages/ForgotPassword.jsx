import { useState } from "react";
import LognIn from "../Asset/Img/login.svg";
import { Link } from "react-router-dom";
import OAuth from "../component/OAuth";
import { toast } from "react-toastify";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

 const ForgotPassword=()=> {
  const [email,setEmail]=useState("");
  const changeHandler=(e)=>{
    e.preventDefault();
    setEmail(e.target.value)
  }
  const onSubmitHandler=async(e)=>{
   e.preventDefault();
   try {
    const auth =getAuth();
     await sendPasswordResetEmail(auth,email);
     toast.success("Email was Send");
    
   } catch (error) {
    toast.error("Could Not Send Reset Password")
   }

  }

  return (
    <section>
      <h1 className='text-3xl font-bold text-center py-3 text-blue-800'>Forgot Password</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-10 md:mb-6"> 
          <img src={LognIn} alt='key' className=" w-full rounded-2xl"/>
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form onSubmit={onSubmitHandler}>
            <input className="w-full px-4 py-2 text-xl text-gray-700 bg-white rounded transition ease-in-out mb-6" type="email" id='email' value={email} onChange={changeHandler}placeholder="Email" autoComplete="off" />
          
           
            <div className=" flex justify-between whitespace-nowrap text-sm sm:text-lg">
                <p className="mb-6">Don't have a Account?
                <Link to="/sign-up" className="text-red-500 hover:text-red-700 transition duration-200 ease-in-out ml-1">Register</Link>
                </p>
                <p>
                  <Link to="/sign-in" className="text-blue-500 hover:text-blue-700 transition duration-200 ease-in-out">Sign In Instead</Link>
                </p>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-800 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800">Send reset Password</button>
          <div className=" flex items-center my-4 before:border-t before:flex-1 before:border-gray-400 after:border-t after:flex-1 after:border-gray-400">
            <p className=" text-center font-semibold mx-4">OR</p>
          </div>
          </form>
         <OAuth/>
        </div>
      </div>
    </section>
  )
}
export default ForgotPassword

