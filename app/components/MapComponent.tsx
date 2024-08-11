import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { useState } from "react";

const libraries: ("places" | "geometry" | "drawing" | "visualization")[] = [
  "places",
];

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 0,
  lng: 0,
};

export default function MapComponent() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!, // Your Google Maps API key
    libraries,
  });

  const [markerPosition, setMarkerPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const handlePlaceSelect = (place: google.maps.GeocoderResult) => {
    if (place.geometry && place.geometry.location) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setMarkerPosition({ lat, lng });
    }
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps</div>;

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your location"
        onBlur={(event) => {
          const geocoder = new google.maps.Geocoder();
          geocoder.geocode(
            { address: event.target.value },
            (results, status) => {
              if (status === "OK" && results && results[0]) {
                handlePlaceSelect(results[0]);
              }
            }
          );
        }}
        className="border p-2 w-full mb-4"
      />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={markerPosition || center}
      >
        {markerPosition && <Marker position={markerPosition} />}
      </GoogleMap>
    </div>
  );
}
