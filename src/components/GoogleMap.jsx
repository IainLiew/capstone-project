import { useState } from "react";
import { APIProvider, Map, AdvancedMarker, InfoWindow } from "@vis.gl/react-google-maps";

export default function GoogleMap() {
    const position = { lat: 3.1170150910977275, lng: 101.61356778159477 }
    const [open, setOpen] = useState(false);
    const googleMapApi = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const mapId = import.meta.env.VITE_MAP_ID;

    return (
        <APIProvider apiKey={googleMapApi} >
            <div style={{ height: "100vh" }}>
                <Map defaultZoom={14} defaultCenter={position} mapId={mapId} ></Map>
                <AdvancedMarker position={position} onClick={() => setOpen(true)}>

                </AdvancedMarker>
                {open && <InfoWindow position={position} onCloseClick={() => setOpen(false)}></InfoWindow>}
            </div>
        </APIProvider>
    )
}