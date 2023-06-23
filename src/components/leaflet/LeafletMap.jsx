import React, {useEffect, useRef} from 'react'

/* MAP - Leaflet kort */
import L from "leaflet"
import "leaflet/dist/leaflet.css"

import "../leaflet/leafletMap.scss"
import icon from "leaflet/dist/images/marker-icon.png"

let defaultIcon = L.icon({
  iconUrl: icon,
  iconSize:[24,36],
  iconAnchor: [12,36],
  className:"marker-style"
})

L.Marker.prototype.options.icon = defaultIcon

const LeafletMap = ({coords}) => {

  //reference til mapcontainer
  const mapRef = useRef()

  //reference til 1 markør/marker
  const markerRef = useRef()
  

  useEffect(() => {
    
    if(!mapRef.current){
      mapRef.current = L.map('mapcontainer').setView(coords, 12);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(mapRef.current);

      markerRef.current = L.marker( coords ).addTo(mapRef.current)//laver markøren

    } else {
      mapRef.current.setView(coords, 13)
      markerRef.current.setLatLng(coords)//flytter markøren
    }
  
  }, [coords])
  



  return (
    <div id='mapcontainer' style={{width:"500px", height:"500px"}}>kortet loader ...</div>
  )
}

export default LeafletMap