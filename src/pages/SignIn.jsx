import { useState } from "react";
import LognIn from "../Asset/Img/login.svg";
import {AiFillEyeInvisible,AiFillEye} from 'react-icons/ai';
import { Link } from "react-router-dom";
import OAuth from "../component/OAuth";

 const SignIn=()=> {
  const [fromData,setFromData]=useState({
  email:'',
  password:''
  });
  const [showPassword,setShowPassword]=useState(false);

  const{email,password}=fromData;
  const changeHandler=(e)=>{
    e.preventDefault();
    setFromData((preData)=>({
      ...preData,
      [e.target.id]:e.target.value

    }))


  }

  return (
    <section>
      <h1 className='text-3xl font-bold text-center py-3 text-blue-800'>Sign In</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-10 md:mb-6"> 
          <img src={LognIn} alt='key' className=" w-full rounded-2xl"/>
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form >
            <input className="w-full px-4 py-2 text-xl text-gray-700 bg-white rounded transition ease-in-out mb-6" type="email" id='email' value={email} onChange={changeHandler}placeholder="Email Address" autoComplete="off" />
            <div className="relative mb-6">
            <input className="w-full px-4 py-2 text-xl text-gray-700 bg-white rounded transition ease-in-out" 
            type={showPassword?'text':'password'} id='password' value={password} onChange={changeHandler}placeholder="Password" autoComplete="off" />
            {showPassword?(<AiFillEyeInvisible className="absolute text-xl right-3 top-3 cursor-pointer" onClick={()=>{setShowPassword((preState)=>!preState)}}/>):<AiFillEye className="absolute text-xl right-3 top-3 cursor-pointer"onClick={()=>{setShowPassword((preState)=>!preState)}}/>}
            </div>
            <div className=" flex justify-between whitespace-nowrap text-sm sm:text-lg">
                <p className="mb-6">Don't have a Account?
                <Link to="/sign-up" className="text-red-500 hover:text-red-700 transition duration-200 ease-in-out ml-1">Register</Link>
                </p>
                <p>
                  <Link to="/forgot-password" className="text-blue-500 hover:text-blue-700 transition duration-200 ease-in-out">Forget Password!</Link>
                </p>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-800 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800">Sign In</button>
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
export default SignIn
