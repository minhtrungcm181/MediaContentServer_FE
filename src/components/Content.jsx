import { Outlet } from "react-router-dom";
import AddGenre from "../pages/AddGenre";
import AddMovie from "../pages/AddMovie";
import MovieList from "./MovieList";

const Content = () => {
  return (
    <div class="w-full lg:flex-1 bg-gray-600 mt-14">
      
      <main class="p-1 ml-72 pt-10">
       <Outlet/>
      </main>
    </div>
  );
};

export default Content;
