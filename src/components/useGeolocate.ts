import { useState, useEffect } from "react";


type Position = {
  lat: number;
  lng: number;
} | null;

export const useGeolocation = (defaultPosition: Position = null) => {

  const [loadingStatus, setLoadingStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");  
  const [error, setError] = useState<string | null>(null);
  const [currentPosition, setCurrentPosition] = useState<Position>(defaultPosition);

  useEffect(() => {
    console.log("currentPosition:", currentPosition);
  }, [currentPosition]);

  const getLocation = () => {
    setLoadingStatus("loading");
    
    if (!navigator.geolocation) {
      setError("Your browser does not support geolocation");
      setLoadingStatus("error");
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCurrentPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
        setLoadingStatus("ready");
        console.log("Geolocation success: ", pos);
      },
      (error) => {
        setError(error.message);
        setLoadingStatus("error");
        console.log("Geolocation Error: ", error);
      }
    );
  };

  return { currentPosition, error, loadingStatus, getLocation };
};
