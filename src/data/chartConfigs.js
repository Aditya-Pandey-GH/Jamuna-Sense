// Donut Chart - Pollution Causes
export const getCausesChartOption = () => ({
  tooltip: {
    trigger: "item",
    formatter: "{b}: {c}%",
  },
  legend: {
    orient: "vertical",
    left: "left",
    textStyle: {
      fontSize: 13,
      fontFamily: "Georgia, serif",
    },
  },
  series: [
    {
      name: "Pollution Causes",
      type: "pie",
      radius: ["45%", "70%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 8,
        borderColor: "#fff",
        borderWidth: 3,
      },
      label: {
        show: true,
        formatter: "{b}\n{c}%",
        fontSize: 12,
        fontWeight: "bold",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 14,
          fontWeight: "bold",
        },
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
      data: [
        {
          value: 70,
          name: "Domestic Sewage",
          itemStyle: { color: "#EF4444" },
        },
        {
          value: 20,
          name: "Industrial Waste",
          itemStyle: { color: "#F59E0B" },
        },
        {
          value: 5,
          name: "Plastic & Solid Waste",
          itemStyle: { color: "#8B5CF6" },
        },
        {
          value: 5,
          name: "Agricultural Runoff",
          itemStyle: { color: "#22C55E" },
        },
      ],
    },
  ],
});

// Pictorial Chart - Pollutants
export const getPollutantsChartOption = () => ({
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  xAxis: {
    type: "value",
    max: 100,
    axisLabel: {
      formatter: "{value}%",
    },
  },
  yAxis: {
    type: "category",
    data: ["Pesticides", "Plastic", "Bacteria", "Chemicals", "Detergents"],
    axisLabel: {
      fontSize: 13,
      fontFamily: "Georgia, serif",
    },
  },
  grid: {
    left: "15%",
    right: "10%",
    top: "5%",
    bottom: "5%",
  },
  series: [
    {
      type: "bar",
      data: [
        { value: 10, itemStyle: { color: "#22C55E" } },
        { value: 15, itemStyle: { color: "#8B5CF6" } },
        { value: 25, itemStyle: { color: "#EF4444" } },
        { value: 30, itemStyle: { color: "#F59E0B" } },
        { value: 35, itemStyle: { color: "#3B82F6" } },
      ],
      barWidth: "50%",
      itemStyle: {
        borderRadius: [0, 6, 6, 0],
      },
      label: {
        show: true,
        position: "right",
        formatter: "{c}%",
        fontSize: 12,
        fontWeight: "bold",
      },
    },
  ],
});

// Water Quality Comparison - Horizontal Bar Chart
export const getWaterQualityChartOption = () => ({
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  legend: {
    data: ["Clean River Standards", "Current Delhi Reality"],
    bottom: 0,
    textStyle: {
      fontSize: 12,
      fontFamily: "Georgia, serif",
    },
  },
  grid: {
    left: "20%",
    right: "10%",
    top: "5%",
    bottom: "15%",
  },
  xAxis: {
    type: "value",
    axisLabel: {
      fontSize: 11,
    },
  },
  yAxis: {
    type: "category",
    data: ["pH Level", "BOD (mg/L)", "DO (mg/L)"],
    axisLabel: {
      fontSize: 13,
      fontFamily: "Georgia, serif",
    },
  },
  series: [
    {
      name: "Clean River Standards",
      type: "bar",
      data: [7.5, 3, 5],
      itemStyle: {
        color: "#10B981",
        borderRadius: [0, 6, 6, 0],
      },
      label: {
        show: true,
        position: "right",
        fontSize: 11,
      },
    },
    {
      name: "Current Delhi Reality",
      type: "bar",
      data: [8.2, 52, 0.8],
      itemStyle: {
        color: "#DC2626",
        borderRadius: [0, 6, 6, 0],
      },
      label: {
        show: true,
        position: "right",
        fontSize: 11,
      },
    },
  ],
});