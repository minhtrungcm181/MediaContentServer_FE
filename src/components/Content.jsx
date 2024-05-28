import { Outlet } from "react-router-dom";
import AddGenre from "../pages/AddGenre";
import AddMovie from "../pages/AddMovie";
import MovieList from "./MovieList";

const Content = () => {
  return (
    <div class="w-full lg:flex-1 bg-gray-800 mt-20">
      <main class="pb-5 ml-72 pt-5 bg-gray-800">
       <Outlet/>
      </main>
    </div>
  );
};

export default Content;
