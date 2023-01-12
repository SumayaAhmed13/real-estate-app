import { useState } from "react";

 const CreateListing = () => {
    const [fromData,setFromData]=useState({
        type:"rent",
        name:"",
        bedrooms:1,
        bathroom:1,
        parking:false,
        lift:false,
        address:"",
        description:"",
        offers:false,
       
        regularPrice:0,
        discountedPrice:0
    })
   const{type,name,bedrooms,bathroom,parking,lift,address,description,offers,regularPrice,discountedPrice}=fromData;
   const onSubmitHandler=()=>{

    }
  return (
    <main className=" max-w-md px-2 mx-auto">
        <h1 className=" text-3xl text-center mt-6 font-bold"> Creating a Listing</h1>
        <form>
            <p className=" text-lg mt-6 font-semibold">Sell / Rent</p>
            <div className=" flex">
                <button type="button" value="rent" id="type" onClick={onSubmitHandler} className={`mr-3 px-7 py-3 text-sm uppercase  font-medium rounded shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${type==='rent'?"bg-white text-black":"bg-slate-700 text-white"}`}>Rent</button>
                <button type="button" value="sell" id="type" onClick={onSubmitHandler} className={`ml-3 px-7 py-3 text-sm uppercase  font-medium rounded shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${type==='sell'?"bg-white text-black":"bg-slate-700 text-white"}`}>Sell</button>
            </div>
            <p className="text-lg mt-6 font-semibold">Name</p>
            <input type="text" id="name" value={name} placeholder="Name" maxLength="30" minLength="5" required 
             onChange={onSubmitHandler} autoComplete="off"
             className=" w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-700 mb-6"/>
             <div className=" flex space-x-6 mb-6">
              <div>
                <p className=" text-lg font-semibold">Beds</p>
                <input type="number" id="bedrooms" value={bedrooms} onChange={onSubmitHandler} required minLength="1" maxLength="50"
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-700 text-center"/>
              </div>
              <div>
                <p className=" text-lg font-semibold">Baths</p>
                <input type="number" id="bathrooms" value={bathroom} onChange={onSubmitHandler} required minLength="1" maxLength="50"
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-700 text-center"/>
              </div>
             </div>
            <p className=" text-lg mt-6 font-semibold">Parking</p>
            <div className="flex">
                <button type="button" value={true} id="parking" onClick={onSubmitHandler} className={`mr-3 px-7 py-3 text-sm uppercase  font-medium rounded shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${!parking?"bg-white text-black":"bg-slate-700 text-white"}`}>Yes</button>
                <button type="button" value={true} id="parking" onClick={onSubmitHandler} className={`ml-3 px-7 py-3 text-sm uppercase  font-medium rounded shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${parking?"bg-white text-black":"bg-slate-700 text-white"}`}>No</button>
            </div>
            <p className=" text-lg mt-6 font-semibold">Lift</p>
            <div className="flex">
                <button type="button" value={true} id="lift" onClick={onSubmitHandler} className={`mr-3 px-7 py-3 text-sm uppercase  font-medium rounded shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${!lift?"bg-white text-black":"bg-slate-700 text-white"}`}>Yes</button>
                <button type="button" value={true} id="lift" onClick={onSubmitHandler} className={`ml-3 px-7 py-3 text-sm uppercase  font-medium rounded shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${lift?"bg-white text-black":"bg-slate-700 text-white"}`}>No</button>
            </div>
            <p className="text-lg mt-6 font-semibold">Address</p>
            <textarea type="text" id="address" value={address} placeholder="Address" required 
             onChange={onSubmitHandler} autoComplete="off"
             className=" w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-700 mb-6"/>
            <p className="text-lg font-semibold">Description</p>
            <textarea type="text" id="description" value={description} placeholder="Description"required 
             onChange={onSubmitHandler} autoComplete="off"
             className=" w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-700 mb-6"/>
            <p className=" text-lg font-semibold">Offers</p>
            <div className="flex mb-6">
                <button type="button" value={true} id="offers" onClick={onSubmitHandler} className={`mr-3 px-7 py-3 text-sm uppercase  font-medium rounded shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${!offers?"bg-white text-black":"bg-slate-700 text-white"}`}>Yes</button>
                <button type="button" value={true} id="offers" onClick={onSubmitHandler} className={`ml-3 px-7 py-3 text-sm uppercase  font-medium rounded shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${offers?"bg-white text-black":"bg-slate-700 text-white"}`}>No</button>
            </div>
            <div className=" flex items-center">
              <div>
              <p className="text-lg font-semibold">Regular Price</p>
              <div className="flex space-x-6 justify-center items-center w-full mb-6 ">
              <input type="number" id="regularPrice" value={regularPrice} min="5000" required onChange={onSubmitHandler}
               className="w-full bg-white text-center rounded text-xl font-semibold px-4 py-2 text-gray-700 border
                border-gray-300 transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-700 "/>
                {type==='rent'&&(<div>
                  <p className=" w-full text-center whitespace-nowrap text-lg">BDT/ Month</p>
                </div>)}
              </div>
           
              </div>
            </div>
            {offers &&(
              <div className=" flex items-center">
              <div>
              <p className="text-lg font-semibold">Discounted Price</p>
              <div className="flex space-x-6 justify-center items-center w-full mb-6 ">
              <input type="number" id="discountedPrice" value={discountedPrice} min="5000" required onChange={onSubmitHandler}
               className="w-full bg-white text-center rounded text-xl font-semibold px-4 py-2 text-gray-700 border
                border-gray-300 transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-700 "/>
                {type==='rent'&&(<div>
                  <p className=" w-full text-center whitespace-nowrap text-lg">BDT</p>
                </div>)}
              </div>
           
              </div>
            </div>
            )}
            <div className="mb-6">
              <p className=" text-xl font-semibold">Images</p>
              <p className=" text-gray-400">The first image will be the cover (max 6)</p>
              <input type="file" id="images" onChange={onSubmitHandler} accept=".jpg,.png,.jpeg" multiple required
              className=" w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:border-slate-600"/>
            </div>
            <button type="submit" className=" w-full bg-blue-500 text-sm text-white mb-6 px-7 py-3 font-medium uppercase
             rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg  transition duration-150 ease-in-out">Creating Listing</button>
        </form>
    </main>
  )
}
export default CreateListing;
