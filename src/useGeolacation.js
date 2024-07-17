import { useState, useEffect } from "react";

export function useGeolocation(defaultPosition=null) {
  const [loadingStatus, setLoadingStatus] = useState("idle");  
  const [error, setError] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(defaultPosition);
  
  
  useEffect(()=>{
    console.log("currentPosition:",currentPosition )
  },[currentPosition])

  const getLocation = () => {
    setLoadingStatus("loading")
    
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");
    
    
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCurrentPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
        setLoadingStatus("ready");
        console.log("Geolocation success: ",pos);
        
      },
      (error) => {
        setError(error.message);
        setLoadingStatus("error");
        console.log("Geolocation Error: ", error)
      }
      
    );
  };

  


  return {currentPosition, error, loadingStatus, getLocation};
}
