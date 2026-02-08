import React from "react";
import ReactECharts from "echarts-for-react";

const TimelineChart = () => {
  const getChartOption = () => ({
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      data: ["Funds Allocated", "Pollution Level (%)"],
      textStyle: {
        color: "#1e293b",
        fontSize: 12,
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      top: "15%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: ["1993", "2000", "2010", "2015", "2020", "2025"],
      axisLabel: {
        color: "#475569",
        fontSize: 12,
      },
      axisLine: {
        lineStyle: {
          color: "#cbd5e1",
        },
      },
    },
    yAxis: [
      {
        type: "value",
        name: "Crores (₹)",
        position: "left",
        axisLabel: {
          formatter: "₹{value}",
          color: "#475569",
          fontSize: 11,
        },
        axisLine: {
          lineStyle: {
            color: "#cbd5e1",
          },
        },
        splitLine: {
          lineStyle: {
            color: "#f1f5f9",
          },
        },
      },
      {
        type: "value",
        name: "Pollution %",
        position: "right",
        max: 100,
        axisLabel: {
          formatter: "{value}%",
          color: "#475569",
          fontSize: 11,
        },
        axisLine: {
          lineStyle: {
            color: "#cbd5e1",
          },
        },
        splitLine: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: "Funds Allocated",
        type: "bar",
        data: [200, 500, 1500, 3000, 5500, 8000],
        itemStyle: {
          color: "#3b82f6",
          borderRadius: [4, 4, 0, 0],
        },
        label: {
          show: true,
          position: "top",
          formatter: "₹{c}",
          fontSize: 10,
        },
      },
      {
        name: "Pollution Level (%)",
        type: "line",
        yAxisIndex: 1,
        data: [75, 76, 78, 77, 79, 78],
        itemStyle: {
          color: "#dc2626",
        },
        lineStyle: {
          width: 3,
        },
        symbol: "circle",
        symbolSize: 8,
        label: {
          show: true,
          position: "top",
          formatter: "{c}%",
          fontSize: 10,
          color: "#dc2626",
        },
      },
    ],
  });

  return (
    <section className="chart-section animate-on-scroll" id="chart-section">
      <h2 className="section-title">The Investment-Impact Disconnect</h2>
      <p className="section-description">
        Cumulative funding has grown exponentially, yet pollution levels
        remain stubbornly high. This chart reveals the gap between financial
        commitment and environmental outcomes.
      </p>
      <div className="chart-wrapper">
        <ReactECharts option={getChartOption()} style={{ height: "400px" }} />
      </div>
    </section>
  );
};

export default TimelineChart;