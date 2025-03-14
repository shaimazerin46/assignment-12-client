import { useEffect, useState } from "react";


const useLocation = () => {
  const [location,setLocation] = useState(null);
  const [error,setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [address,setAddress] = useState()

  useEffect(()=>{
    if(!navigator.geolocation){
        setError('Geolocation is not supported by your browser');
        setLoading(false)
        return;
    }
    navigator.geolocation.getCurrentPosition(
        (position)=>{
            const {latitude,longitude} = position.coords;
            setLocation({lat:latitude,lon:longitude})
            fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
            .then(res=>res.json())
            .then(data=>{
                const { village, town, city, county, state, country } = data.address;
                const formattedAddress = `${village || town || city || county}, ${
                  state || ""
                }, ${country}`;
                setAddress(formattedAddress);
                setLoading(false)
            })
            
        },
        (error)=>{
            setError(error.message);
            setLoading(false)
        }
        
    );
  },[]);

  return {address,location,error,loading}
}

export default useLocation;