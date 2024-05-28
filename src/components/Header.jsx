import { SiThemoviedatabase } from "react-icons/si";
import { BsSearch,BsBell } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import image from '../assets/user-01.png';


function getDate() {
  const today = new Date().toDateString();
  return today
}
const WeatherIcons = {
  "01d": "/react-weather-app/icons/sunny.svg",
  "01n": "/react-weather-app/icons/night.svg",
  "02d": "/react-weather-app/icons/day.svg",
  "02n": "/react-weather-app/icons/cloudy-night.svg",
  "03d": "/react-weather-app/icons/cloudy.svg",
  "03n": "/react-weather-app/icons/cloudy.svg",
  "04d": "/react-weather-app/icons/perfect-day.svg",
  "04n": "/react-weather-app/icons/cloudy-night.svg",
  "09d": "/react-weather-app/icons/rain.svg",
  "09n": "/react-weather-app/icons/rain-night.svg",
  "10d": "/react-weather-app/icons/rain.svg",
  "10n": "/react-weather-app/icons/rain-night.svg",
  "11d": "/react-weather-app/icons/storm.svg",
  "11n": "/react-weather-app/icons/storm.svg",
};


const Header = () => {
  const [currentDate, setCurrentDate] = useState(getDate());
  const [weather, updateWeather] = useState();
  const fetchWeather = async (e) => {
    e.preventDefault();
    const response = await Axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${HoChiMinh,VN}&appid=b1da24433abcf12525e77f96ccd8f673`,
    );
    updateWeather(response.data);
  };

 

  return (
    // <div className="navbar bg-gray-900 fixed z-10 justify-between">
    
    //   <div className="flex-1">
    //     {/* <a className="btn btn-ghost normal-case text-xl"> */}
    //     <Link to="/" className="normal-case text-xl">
    //       {/* <SiThemoviedatabase className="h-14 w-14 ml-10 text-violet-500 p-1 hover:bg-violet-700 hover:bg-opacity-50 hover:rounded-lg" /> */}
    //       <h1 className="ml-5 p-5">Hotel Media and Device Manager</h1>
          
    //     </Link>
    //     {/* </a> */}
    //   </div>
    //   <div><span class="ms-3 text-xl font-medium text-gray-900 dark:text-gray-300">{currentDate}, Hi Admin</span> </div>
    //   {/* <div className="navbar-end">
    //     <button className="btn btn-ghost btn-circle">
    //       <BsSearch className="h-5 w-5"/>
          
    //     </button>
    //     <button className="btn btn-ghost btn-circle">
    //       <div className="indicator">
    //         <BsBell className="h-5 w-5"/>
            
    //         <span className="badge badge-xs badge-primary indicator-item"></span>
    //       </div>
    //     </button>
    //   </div> */}
    // </div>
    <div class="navbar fixed z-10 justify-between h-24">
  <div class="flex-1">
    <a class="btn btn-ghost text-xl">Hotel Admin</a>
  </div>
  <div class="flex-none">
    
    <div class="dropdown dropdown-end">
      <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>
      <ul tabindex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <a class="justify-between">
            Profile
            <span class="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>

  );
};

export default Header;
