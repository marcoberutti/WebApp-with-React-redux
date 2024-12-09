import React, { useEffect } from 'react'
import style from './map.module.css'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api'

const containerStyle = {
  width: '100vw',
  height: '100vh',
}
const center = {
  lat: 45.4628246,
  lng: 9.175332,
}

function Map() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCsGl4s0BvZSQm75Wv7JO4cMmQudYmMG1E',
  })

  const [map, setMap] = React.useState(null)
  const [showInfoWindow, setShowInfoWindow] = React.useState(false)
  const zoom = 12

  const onLoad = React.useCallback(function callback(map) {
    // Imposta i limiti della mappa
    const bounds = new window.google.maps.LatLngBounds(center)
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const milanCoordinates = {
    lat: 45.464211, // Coordinate di Milano
    lng: 9.191383,  // Coordinate di Milano
  }

  const handleMarkerClick = () => {
    setShowInfoWindow(!showInfoWindow) // Mostra o nasconde la InfoWindow quando il marker è cliccato
  }

  return isLoaded ? (
    <div className={style.mainContainer}>
      <aside className={style.asideBar}>
        <h1>asideBar</h1>
      </aside>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}  // Passa lo stato dello zoom qui
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Aggiungi il Marker */}
        <Marker position={milanCoordinates} onClick={handleMarkerClick} /> 
        
        {/* Aggiungi l'InfoWindow */}
        {showInfoWindow && (
          <InfoWindow
            position={milanCoordinates}
            onCloseClick={() => setShowInfoWindow(false)} // Chiudi la InfoWindow quando clicchi sulla 'X'
          >
            <div>
              <h2>My company LTD</h2>
              <p>21th street, Chicago - ITALIAN BRANCH</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  ) : (
    <></>
  )
}

export default React.memo(Map)
