import React from "react";
import "./CriticalWarning.css";

const CriticalWarning = () => {
    return (
        <div className="critical-warning">
            <div className="warning-icon">!</div>
            <div className="warning-content">
                <h3 className="warning-title">Ecological Emergency Status</h3>
                <p className="warning-text">
                    The Yamuna River in Delhi is classified as biologically dead with
                    dissolved oxygen levels near zero. Despite being sacred and
                    culturally significant, this 22km stretch receives untreated sewage
                    equivalent to the waste of over 20 million people daily, making it
                    one of the most polluted river stretches in the world.
                </p>
            </div>
        </div>
    );
};

export default CriticalWarning;