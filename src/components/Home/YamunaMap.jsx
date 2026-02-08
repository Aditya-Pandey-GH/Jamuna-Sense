import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  CircleMarker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./YamunaMap.css";

// Yamuna River path coordinates (simplified route from origin to confluence)
const yamunaRiverPath = [
  [31.0117, 78.45], // Yamunotri (Origin)
  [30.4285, 77.7644], // Dakpathar
  [30.129, 77.2674], // Yamuna Nagar
  [29.9457, 77.7083], // Karnal
  [28.9931, 77.7085], // Panipat
  [28.713, 77.234], // Delhi - Wazirabad
  [28.6562, 77.241], // Delhi - ITO
  [28.5889, 77.25], // Delhi - Nizamuddin
  [28.5355, 77.31], // Delhi - Okhla
  [28.3949, 77.3674], // Faridabad
  [28.238, 77.5037], // Palwal
  [27.4924, 77.6737], // Mathura
  [27.1767, 78.0081], // Agra
  [26.7855, 79.0215], // Etawah
  [26.4499, 80.3319], // Kanpur (nearby)
  [25.4358, 81.8463], // Prayagraj (Confluence with Ganga)
];

// Pollution monitoring stations along Yamuna
const yamunaStations = [
  {
    id: 1,
    name: "Yamunotri (Origin)",
    lat: 31.0117,
    lng: 78.45,
    pollutionLevel: "Low",
    description: "Pristine glacial source in the Himalayas",
    bod: "1.2 mg/L",
    do: "8.5 mg/L",
  },
  {
    id: 2,
    name: "Dakpathar",
    lat: 30.4285,
    lng: 77.7644,
    pollutionLevel: "Low",
    description: "Upper Yamuna, relatively clean waters",
    bod: "2.1 mg/L",
    do: "7.8 mg/L",
  },
  {
    id: 3,
    name: "Yamuna Nagar",
    lat: 30.129,
    lng: 77.2674,
    pollutionLevel: "Medium",
    description: "Industrial activity begins affecting water quality",
    bod: "5.8 mg/L",
    do: "5.2 mg/L",
  },
  {
    id: 4,
    name: "Delhi - Wazirabad",
    lat: 28.713,
    lng: 77.234,
    pollutionLevel: "High",
    description: "Entry point into Delhi, pollution increases significantly",
    bod: "28.5 mg/L",
    do: "2.1 mg/L",
  },
  {
    id: 5,
    name: "Delhi - Nizamuddin",
    lat: 28.5889,
    lng: 77.25,
    pollutionLevel: "High",
    description: "Heavy sewage discharge, critical pollution zone",
    bod: "52.3 mg/L",
    do: "0.8 mg/L",
  },
  {
    id: 6,
    name: "Delhi - Okhla",
    lat: 28.5355,
    lng: 77.31,
    pollutionLevel: "High",
    description: "Exit from Delhi, peak pollution levels",
    bod: "48.7 mg/L",
    do: "1.2 mg/L",
  },
  {
    id: 7,
    name: "Mathura",
    lat: 27.4924,
    lng: 77.6737,
    pollutionLevel: "Medium",
    description: "Religious activities and oil refinery impact",
    bod: "12.4 mg/L",
    do: "4.5 mg/L",
  },
  {
    id: 8,
    name: "Agra",
    lat: 27.1767,
    lng: 78.0081,
    pollutionLevel: "Medium",
    description: "Urban and industrial discharge continues",
    bod: "15.6 mg/L",
    do: "3.8 mg/L",
  },
  {
    id: 9,
    name: "Etawah",
    lat: 26.7855,
    lng: 79.0215,
    pollutionLevel: "Medium",
    description: "Mixed agricultural and urban runoff",
    bod: "8.9 mg/L",
    do: "4.2 mg/L",
  },
  {
    id: 10,
    name: "Prayagraj (Confluence)",
    lat: 25.4358,
    lng: 81.8463,
    pollutionLevel: "Low",
    description: "Confluence with Ganga, some natural purification",
    bod: "4.2 mg/L",
    do: "6.5 mg/L",
  },
];

// Helper function to get color based on pollution level
const getPollutionColor = (level) => {
  switch (level) {
    case "Low":
      return "#22c55e"; // Green
    case "Medium":
      return "#eab308"; // Yellow
    case "High":
      return "#ef4444"; // Red
    default:
      return "#6b7280"; // Gray
  }
};

// Get river segment color based on pollution of nearby stations
const getRiverSegmentColor = (index) => {
  // Color segments based on the pollution level of nearby stations
  if (index < 3) return "#22c55e"; // Low pollution (source region)
  if (index >= 3 && index < 6) return "#ef4444"; // High pollution (Delhi region)
  if (index >= 6 && index < 9) return "#eab308"; // Medium pollution (Mathura-Agra)
  return "#22c55e"; // Low pollution (after confluence)
};

// Component to auto-fit map bounds
const MapBounds = () => {
  const map = useMap();

  React.useEffect(() => {
    // Fit bounds to show entire river with minimal padding for closer view
    map.fitBounds(yamunaRiverPath, { padding: [30, 30] });
  }, [map]);

  return null;
};

const YamunaMap = () => {
  const [selectedStation, setSelectedStation] = useState(null);
  const [hoveredStation, setHoveredStation] = useState(null);

  return (
    <section className="yamuna-map-section">
      <div className="yamuna-map-container">
        <div className="map-header">
          <h2>Yamuna River - Pollution Journey Map</h2>
          <p>
            Follow the 1,376 km journey from pristine Himalayan source to the
            Ganga confluence
          </p>
        </div>

        <div className="map-wrapper">
          <MapContainer
            center={[28.6139, 77.209]}
            zoom={7}
            scrollWheelZoom={false}
            zoomControl={true}
            dragging={true}
            doubleClickZoom={false}
            touchZoom={true}
            className="leaflet-map"
          >
            {/* Minimal base map - light gray style */}
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />

            <MapBounds />

            {/* Draw shadow/outline first for depth effect */}
            <Polyline
              positions={yamunaRiverPath}
              pathOptions={{
                color: "#1e293b",
                weight: 10,
                opacity: 0.15,
                lineJoin: "round",
                lineCap: "round",
              }}
            />

            {/* Draw the Yamuna River path with realistic river styling */}
            {yamunaRiverPath.map((position, index) => {
              if (index === yamunaRiverPath.length - 1) return null;

              return (
                <Polyline
                  key={`segment-${index}`}
                  positions={[
                    yamunaRiverPath[index],
                    yamunaRiverPath[index + 1],
                  ]}
                  pathOptions={{
                    color: getRiverSegmentColor(index),
                    weight: 8,
                    opacity: 0.9,
                    lineJoin: "round",
                    lineCap: "round",
                  }}
                />
              );
            })}

            {/* Add a lighter inner line for water effect */}
            {yamunaRiverPath.map((position, index) => {
              if (index === yamunaRiverPath.length - 1) return null;

              const color = getRiverSegmentColor(index);
              const lighterColor = color === "#22c55e" ? "#34d399" : 
                                   color === "#eab308" ? "#fbbf24" : 
                                   "#f87171";

              return (
                <Polyline
                  key={`inner-${index}`}
                  positions={[
                    yamunaRiverPath[index],
                    yamunaRiverPath[index + 1],
                  ]}
                  pathOptions={{
                    color: lighterColor,
                    weight: 4,
                    opacity: 0.6,
                    lineJoin: "round",
                    lineCap: "round",
                  }}
                />
              );
            })}

            {/* Pollution monitoring stations */}
            {yamunaStations.map((station) => (
              <CircleMarker
                key={station.id}
                center={[station.lat, station.lng]}
                radius={hoveredStation?.id === station.id ? 12 : 8}
                pathOptions={{
                  color: "#fff",
                  fillColor: getPollutionColor(station.pollutionLevel),
                  fillOpacity: 0.95,
                  weight: 3,
                  className: "station-marker",
                }}
                eventHandlers={{
                  mouseover: () => setHoveredStation(station),
                  mouseout: () => setHoveredStation(null),
                  click: () => setSelectedStation(station),
                }}
              >
                <Popup>
                  <div className="popup-content">
                    <h3>{station.name}</h3>
                    <div className="popup-pollution">
                      <span
                        className="pollution-badge"
                        style={{
                          backgroundColor: getPollutionColor(
                            station.pollutionLevel,
                          ),
                          color: "#fff",
                        }}
                      >
                        {station.pollutionLevel} Pollution
                      </span>
                    </div>
                    <div className="water-quality-stats">
                      <div className="stat-item">
                        <span className="stat-label">BOD:</span>
                        <span className="stat-value">{station.bod}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">DO:</span>
                        <span className="stat-value">{station.do}</span>
                      </div>
                    </div>
                    <p>{station.description}</p>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>

          {/* Legend */}
          <div className="map-legend">
            <h4>River Health Status</h4>
            <div className="legend-items">
              <div className="legend-item">
                <span
                  className="legend-color"
                  style={{ backgroundColor: "#22c55e" }}
                ></span>
                <span className="legend-label">Clean Water</span>
              </div>
              <div className="legend-item">
                <span
                  className="legend-color"
                  style={{ backgroundColor: "#eab308" }}
                ></span>
                <span className="legend-label">Polluted</span>
              </div>
              <div className="legend-item">
                <span
                  className="legend-color"
                  style={{ backgroundColor: "#ef4444" }}
                ></span>
                <span className="legend-label">Severely Polluted</span>
              </div>
            </div>
            <div className="legend-note">
              <small>● = Monitoring Station</small>
            </div>
          </div>

          {/* Hover Info Card */}
          {hoveredStation && (
            <div className="hover-info-card">
              <h3>{hoveredStation.name}</h3>
              <div className="info-pollution">
                <span
                  className="pollution-indicator"
                  style={{
                    backgroundColor: getPollutionColor(
                      hoveredStation.pollutionLevel,
                    ),
                  }}
                ></span>
                <span className="pollution-text">
                  {hoveredStation.pollutionLevel} Pollution
                </span>
              </div>
              <div className="hover-stats">
                <div className="hover-stat">
                  <span className="hover-stat-label">BOD</span>
                  <span className="hover-stat-value">{hoveredStation.bod}</span>
                </div>
                <div className="hover-stat">
                  <span className="hover-stat-label">DO</span>
                  <span className="hover-stat-value">{hoveredStation.do}</span>
                </div>
              </div>
              <p>{hoveredStation.description}</p>
            </div>
          )}

          {/* River Stats */}
          <div className="river-stats-card">
            <div className="stat-box">
              <div className="stat-number">1,376 km</div>
              <div className="stat-description">Total Length</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">22 km</div>
              <div className="stat-description">Delhi Stretch</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">70%</div>
              <div className="stat-description">Delhi's Pollution</div>
            </div>
          </div>
        </div>

        <div className="map-footer">
          <p>
            Water quality data: BOD (Biological Oxygen Demand), DO (Dissolved
            Oxygen) • Click markers for detailed information
          </p>
        </div>
      </div>
    </section>
  );
};

export default YamunaMap;