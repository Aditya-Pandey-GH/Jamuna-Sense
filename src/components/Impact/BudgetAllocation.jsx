import React from "react";
import ReactECharts from "echarts-for-react";

const BudgetAllocation = () => {
  const getTreemapOption = () => ({
    tooltip: {
      formatter: function (info) {
        return `<strong>${info.name}</strong><br/>₹${info.value} Crore<br/>${info.data.description || ""}`;
      },
    },
    series: [
      {
        name: "Budget Allocation",
        type: "treemap",
        width: "100%",
        height: "100%",
        roam: false,
        nodeClick: false,
        breadcrumb: {
          show: false,
        },
        label: {
          show: true,
          formatter: function (params) {
            return `{name|${params.name}}\n{value|₹${params.value}Cr}`;
          },
          rich: {
            name: {
              fontSize: 14,
              fontWeight: "bold",
              color: "#fff",
              lineHeight: 20,
            },
            value: {
              fontSize: 18,
              fontWeight: "700",
              color: "#fff",
              lineHeight: 24,
            },
          },
        },
        upperLabel: {
          show: true,
          height: 30,
          color: "#fff",
          fontSize: 14,
          fontWeight: "bold",
        },
        itemStyle: {
          borderColor: "#fff",
          borderWidth: 3,
          gapWidth: 3,
        },
        levels: [
          {
            itemStyle: {
              borderWidth: 0,
              gapWidth: 5,
            },
          },
          {
            itemStyle: {
              gapWidth: 2,
            },
          },
        ],
        data: [
          {
            name: "Delhi Water & Sanitation (2025)",
            value: 9000,
            itemStyle: { color: "#0f172a" },
            children: [
              {
                name: "Yamuna Cleanup",
                value: 500,
                description: "Direct river cleaning operations",
                itemStyle: { color: "#dc2626" },
              },
              {
                name: "STP Repairs",
                value: 500,
                description: "Existing treatment plant maintenance",
                itemStyle: { color: "#f59e0b" },
              },
              {
                name: "New Sewer Lines",
                value: 250,
                description: "Infrastructure expansion",
                itemStyle: { color: "#8b5cf6" },
              },
              {
                name: "Other Sanitation",
                value: 7750,
                description: "General water & sewage projects",
                itemStyle: { color: "#3b82f6" },
              },
            ],
          },
        ],
      },
    ],
  });

  return (
    <section className="budget-section animate-on-scroll" id="budget-section">
      <h2 className="section-title">
        Delhi Budget 2025-26: Water & Sanitation Breakdown
      </h2>
      <p className="section-description">
        How the ₹9,000 crore water and sanitation budget is allocated across
        different interventions.
      </p>
      <div className="budget-chart-wrapper">
        <ReactECharts option={getTreemapOption()} style={{ height: "450px" }} />
      </div>
      <div className="budget-note">
        Note: While ₹500 crore is specifically allocated for Yamuna cleanup
        and another ₹500 crore for STP repairs, the challenge lies in timely
        execution and addressing sewage from rapidly growing unauthorized
        settlements.
      </div>
    </section>
  );
};

export default BudgetAllocation;