import Content from "../components/Content";
import Header from "../components/Header";
import SideBar from "../components/SideBar";

const Home = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:min-h-screen bg-gray-800">``
      <SideBar />
      <Content />
    </div>
  );
};

export default Home;
