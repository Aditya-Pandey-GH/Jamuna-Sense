
import ReportButton from "../ReportButton";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero">
      {/* LEFT CONTENT */}
      <div className="hero-left">
        {/* <span className="hero-badge">🌊 Yamuna at a Crossroads</span> */}

        <div className="hero-left-text">
          <h1>
            The Yamuna <br /> Deserves Better!
          </h1>

          <p>
            A river that sustained civilizations is now fighting for survival.
            <br />
            Learn what went wrong — and what can still be saved.
          </p>
        </div>

        <div className="heroButton">
          <div className="hero-cta">
            {/* <span className="price">Delhi NCR</span> */}
            <button>Know Your Yamuna →</button>
          </div>
          <div className="reportBtn">
            <ReportButton />
          </div>
        </div>
      </div>
    </section>

  );
};

export default Hero;
