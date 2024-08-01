import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import googleApiKey from "../googleMapsApi";

const containerStyle = {
  width: "100%",
  height: "100%",
};

type MapCoordinates = {
  lat: number;
  lng: number;
};

type GoogleMapComponentProps = {
  center: MapCoordinates;
  zoom: number;
};

export const GoogleMapComponent = ({ center, zoom }: GoogleMapComponentProps) => {
  return (
    <LoadScript googleMapsApiKey={googleApiKey.API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={zoom}>
        <MarkerF position={center} />
      </GoogleMap>
    </LoadScript>
  );
};
