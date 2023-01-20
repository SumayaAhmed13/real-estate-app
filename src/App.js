import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from './pages/Profile';
import Offers from './pages/Offers';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from "./pages/ForgotPassword";
import PrivateOutlet from "./component/PrivateOutlet";
import Header from "./component/Header";
import CreateListing  from "./pages/CreateListing";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Category } from "./pages/Category";


function App() {
  return (
    <>
   
     <Router>
     <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/profile" element={<PrivateOutlet/>}>
          <Route path="/profile" element={<Profile/>}/>
        </Route>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/offers" element={<Offers/>}/>
        <Route path="/create-listing" element={<PrivateOutlet/>}>
        <Route path="/create-listing" element={<CreateListing />}/>
        </Route>
        <Route path="/category" element={<PrivateOutlet/>}>
        <Route path="/category" element={<Category/>}/>
        </Route>
     
      </Routes>
     </Router>
     <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      />
    </>
  );
}

export default App;
