import React from "react";
import "./Hero.css";

const Hero = () => {
    return (
        <header className="yamuna-hero">
            <div className="hero-content">
                <h1 className="hero-title">Know Your Yamuna</h1>
                <p className="hero-subtitle">
                    Understanding India's Sacred but Struggling River
                </p>
                <div className="hero-stats">
                    <div className="hero-stat">
                        <span className="stat-number">1,376 km</span>
                        <span className="stat-label">Total Length</span>
                    </div>
                    <div className="hero-stat">
                        <span className="stat-number">57 Million</span>
                        <span className="stat-label">People Dependent</span>
                    </div>
                    <div className="hero-stat">
                        <span className="stat-number">22 km</span>
                        <span className="stat-label">Delhi's Critical Zone</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Hero;