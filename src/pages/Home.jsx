import Navbar from "../components/Home/Navbar";
import Hero from "../components/Home/Hero";
import ReportsSection from "../components/Home/ReportSection";
import YamunaMap from '../components/Home/YamunaMap';
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      {/* FULLSCREEN BACKGROUND */}
      <div className="bg-image"></div>

      {/* CONTENT ON TOP */}
      <div className="home-content">
        <Hero />
        <div className="content">
          <YamunaMap />
          <ReportsSection />
        </div>
      </div>
    </div>
  );
};

export default Home;
