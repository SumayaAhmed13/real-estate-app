import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc} from 'firebase/firestore';
import {FcGoogle}from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from '../firebase';
const OAuth = () => {
  const navigate=useNavigate();

  const onGoogleClick=async()=>{
    try {
      const auth=getAuth();
      const provider=new GoogleAuthProvider();
      const result= await signInWithPopup(auth,provider);
      const user=result.user;
      //check for user
      const docRef=doc(db,"users",user.uid);
      const docSap= await getDoc(docRef);
      if(!docSap.exists()){
        await setDoc(docRef,{
          name:user.displayName,
          email:user.email,
          timestamp:serverTimestamp()
        })
      }
      navigate('/');

    } catch (error) {
      toast.error("Could not Autherized with Google");
  
     }

  }

  return (
    <div>
        <button type="button" onClick={onGoogleClick} className="w-full bg-red-400 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-red-600 transition duration-150 ease-in-out hover:shadow-lg active:bg-red-600 flex justify-center"><FcGoogle className='text-2xl bg-white mr-2 rounded-full'/> continue with google</button>
    </div>
  )
}
export default OAuth; 

