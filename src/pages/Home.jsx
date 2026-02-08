import { useEffect, useRef, useState } from "react";
import Hero from "../components/Home/Hero";
import YamunaMap from "../components/Home/YamunaMap";
import ReportsSection from "../components/Home/ReportSection";
import waterSound from "../assets/sounds/water-flow.mp3";
import "./Home.css";

const Home = () => {
  const audioRef = useRef(null);
  const scrollTimeout = useRef(null);
  const [audioEnabled, setAudioEnabled] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.25;
    audio.loop = true;

    const handleScroll = () => {
      if (!audioEnabled) return;

      if (audio.paused) {
        audio.play().catch(() => {});
      }

      clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        audio.pause();
      }, 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [audioEnabled]);

  const enableAudio = () => {
    const audio = audioRef.current;
    audio.play().then(() => {
      audio.pause(); // unlocks audio
      setAudioEnabled(true);
    });
  };

  return (
    <div className="home">
      <div className="bg-image"></div>

      {/* Audio */}
      <audio ref={audioRef} src={waterSound} preload="auto" />

      {/* Enable sound overlay */}
      {!audioEnabled && (
        <div className="sound-overlay" onClick={enableAudio}>
          <span>Enable Ambient Sound</span>
        </div>
      )}

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
