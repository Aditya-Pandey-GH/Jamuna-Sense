import React from "react";
import ReactECharts from "echarts-for-react";
import {
  getCausesChartOption,
  getPollutantsChartOption,
  getWaterQualityChartOption,
} from "../../data/chartConfigs";
import "./PollutionCharts.css";

const PollutionCharts = () => {
  return (
    <div className="content-section">
      <h2 className="section-title">What's Polluting Our River?</h2>
      <p className="section-intro">
        Understanding the sources of pollution is the first step toward
        finding solutions. The data below represents contributions from
        different sectors based on CPCB and DPCC monitoring.
      </p>

      <div className="chart-grid">
        <div className="chart-card">
          <h3 className="chart-title">Pollution Sources Distribution</h3>
          <p className="chart-description">
            Percentage contribution of different pollution sources to total
            river contamination
          </p>
          <ReactECharts
            option={getCausesChartOption()}
            style={{ height: "400px" }}
          />
        </div>

        <div className="chart-card">
          <h3 className="chart-title">Major Pollutant Types</h3>
          <p className="chart-description">
            Relative concentration of different contaminants found in the
            river water
          </p>
          <ReactECharts
            option={getPollutantsChartOption()}
            style={{ height: "400px" }}
          />
        </div>
      </div>

      <div className="chart-full">
        <div className="chart-card">
          <h3 className="chart-title">Water Quality Comparison</h3>
          <p className="chart-description">
            Standards vs. Reality: Clean river water should have high
            Dissolved Oxygen (DO), low Biochemical Oxygen Demand (BOD), and
            neutral pH. Delhi's Yamuna shows the opposite.
          </p>
          <ReactECharts
            option={getWaterQualityChartOption()}
            style={{ height: "350px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default PollutionCharts;