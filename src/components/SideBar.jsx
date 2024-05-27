import { Link } from "react-router-dom";
import { RiDashboardLine } from "react-icons/ri";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { BsListCheck } from "react-icons/bs";
import { MdOutlineImportantDevices } from "react-icons/md"
import logo from "../assets/sidebar_log.avif"
import user01 from "../assets/user-01.png"

const SideBar = () => {
  return (
    <div className="w-full lg:w-64 bg-gray-900 shadow-lg  text-gray-200 min-h-screen fixed border-r-indigo-300">
      <div className="mt-10 flex items-center bg-gray-600">
        <img src={logo} className="h-16 ml-3"></img>
      <a class="btn btn-ghost text-2xl normal-case">Hotel Admin</a>
      </div>

      <div className="ml-5 mt-10 flex items-center">
      <div class="btn btn-ghost btn-circle avatar">
        <div class="w-15 rounded-full">
          <img alt="Tailwind CSS Navbar component" src={user01} />
        </div>
      </div>
      <a class="btn btn-ghost text-xl normal-case">Hi, Trung</a>
      </div>

      
      <ul className="py-4 mt-5">
        <Link to="/">
          <li className="px-8 py-4 hover:bg-violet-600 flex items-center gap-3">
            <RiDashboardLine className="h-7 w-7" /> Home
          </li>
        </Link>
        <Link to="movie">
          <li className="px-8 py-4 hover:bg-violet-600 flex items-center gap-3">
            <AiOutlineAppstoreAdd className="h-7 w-7" />
            Add Movie
          </li>
        </Link>
        {/* <Link to="genre">
          <li className="px-8 py-4 hover:bg-violet-600 flex items-center gap-3">
            <BsListCheck className="h-7 w-7" />
            Genre
          </li>
        </Link> */}
        <Link to="device">
          <li className="px-8 py-4 hover:bg-violet-600 flex items-center gap-3">
            <MdOutlineImportantDevices className="h-7 w-7" />
            Room Manager
          </li>
        </Link>
      </ul>
      
    </div>
  );
};

export default SideBar;
