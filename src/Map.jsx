import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function Map() {
  const polygonPositions = [
    [-27.19851314673376, 153.0196107087453],
    [-27.3988474404096, 152.77121195697902],
    [-27.722900473157605, 152.7535532779435],
    [-27.65149280976956, 153.2132675555015],
    [-27.496349920977213, 153.25713843471874],
  ];

  return (
    <MapContainer
      center={[-27.554133771723755, 153.0173908321098]}
      zoom={9}
      style={{ height: "400px", width: "100%", borderRadius: "14px" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <Marker position={[-27.554134, 153.017391]}>
        <Popup>Brisbane</Popup>
      </Marker> */}
      <Polygon
        positions={polygonPositions}
        pathOptions={{
          color: "#333",
          weight: 2,
          fillColor: "#666",
          fillOpacity: 0.2,
        }}
      >
        <Popup permanent>Region we cover.</Popup>
      </Polygon>
    </MapContainer>
  );
}

export default Map;
