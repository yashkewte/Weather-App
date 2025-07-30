import React,{useState} from 'react'
import logo from '../assets/logo/logo-transparent.png'
import { CiSearch } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { toast } from 'react-toastify';


function Navbar({onCitySearch, onLocationFetch}) {

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchQuery = (e)=>{
    setSearchQuery(e.target.value);
  }

  const handleSearchSubmit = (e)=>{
    e.preventDefault();
    if(searchQuery){
      onCitySearch(searchQuery);
      setSearchQuery("");
    }
  }

  const handleLocationClick = () => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((pos)=>{
        const { latitude, longitude } = pos.coords;
        onLocationFetch(latitude, longitude);
        setSearchQuery("");
      },
      (err) => {
        if(err.code === 1){
          console.log(err);
          
          toast.error("Location access denied. Please allow location access to use this feature.");
        } else {
          console.log(err);
          
          toast.error("Unable to retrieve your location. Please try again later.");
        }
      }
    )
    }
  }

  return (
    <div className='m-4 '>
      <div className='flex flex-col justify-between gap-4 lg:flex-row '>
        {/* logo here */}
        <img src={logo} alt="logo" className='w-24 h-20 select-none'/>

        {/* search bar here */}
        <form onSubmit={handleSearchSubmit} className='relative flex items-center mt-3 h-11 w-full max-w-md bg-white rounded-lg shadow-md'>
          <CiSearch color='black' className='absolute left-3 w-6 h-6 pr-1 select-none'/>
          <input type="text" placeholder='Seach your city...'
            onChange={handleSearchQuery}
            value={searchQuery}
            className='w-full py-2 pl-10 pr-4 text-sm text-gray-700 placeholder-gray-400 border-none rounded-lg outline-none'
          />
          <button type='submit' className='bg-[#020e1fde] text py-0.5 px-3 h-full text-white'>
            Serach
          </button>
        </form>

        <div onClick={handleLocationClick} className='flex items-center mt-3 h-11 w-fit gap-3 px-4 font-medium text-white bg-green-500 rounded cursor-pointer'>
          <IoLocationOutline />
          <p>Currnt Location</p>
        </div>
      </div>
    </div>
  )
}

export default Navbar
