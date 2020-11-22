import React from "react";
import GoogleMap from 'google-map-react';
import 'reactjs-popup/dist/index.css';
import SearchBox from "./SearchBox";
import PropTypes from 'prop-types';
import Marker from "./Marker";

interface IProps  {
  toShow: any
  markers: any[]
  setMarkers: any
  setCordinates: any
  useFilter: boolean 
  animalFilter: string
  eventFilter: string
  startDateFilter: Date|undefined
  endDateFilter: Date|undefined
}

const getColorByAnimalType = (AnimalType: string) => {
  switch (AnimalType) {
    case "Cat":
      return 'yellow';
    case "Dog":
      return 'blue';
    case "Fox":
      return 'red';
    case "Jackal":  
      return 'green';
  }
}

const API_KEY = ''


const defaultProps = {
    center: { lat: 32.06, lng: 34.82 },
    zoom: 13.54
}

export const Map = React.memo<IProps>((props) => {

    const _onClick = (obj: any) => {
    console.log(obj.lat, obj.lng)
    let lat = obj.lat
    let lng = obj.lng
    //props.setMarkers(props.markers.concat(<Event lat= {lat} lng = {lng} text={"omer"}/>))
    props.setCordinates({lat: obj.lat, lng: obj.lng})
    //props.toShow(true);
  }

  const filterMarkers = (markers:any) => 
    props.useFilter ? 
      markers.filter((form:any) => form.animal.includes(props.animalFilter) && form.typeOfEvent.includes(props.eventFilter)
      && Date.parse( props.startDateFilter ? props.startDateFilter : form.date ) <= Date.parse(form.date)
      && Date.parse( props.endDateFilter ? props.endDateFilter : form.date ) >= Date.parse(form.date)) : markers
  
  const [location, setLocation] =  React.useState({address:"דרך מצדה 6, באר שבע, ישראל",
  lat: 31.2591166,
  lng: 34.7955966})
  
  const [state, setState] = React.useState( {
    mapsApiLoaded: false,
    mapInstance: null,
    mapsapi: null,
  })

  const apiLoaded= (map:any, maps:any) => {
    setState({
      mapsApiLoaded: true,
      mapInstance: map,
      mapsapi: maps,
    });
  }

  const getMapOptions = (maps: any) => {
    return {
      disableDefaultUI: true,
      mapTypeControl: true,
      streetViewControl: true,
      styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'on' }] }],
    }
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position:any) => {
      setLocation({
        address:"",
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })     
    })
  }

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      {state.mapsApiLoaded && <SearchBox map={state.mapInstance} mapsapi={state.mapsapi} placeholder ={PropTypes.string} onPlacesChanged = {PropTypes.func} location = {location} setLocation = {setLocation} />}
      <GoogleMap 
        bootstrapURLKeys={{
          key: API_KEY,
          language: 'he',
          libraries: 'places'
        }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        center = {location}
        options={getMapOptions}
        onClick={_onClick}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => {
          apiLoaded(map, maps);
        }} >
        {filterMarkers(props.markers).map((form: any)=> <Marker lat={form.lat}
          lng={form.lng}
          name={`${form.animal}\n ${form.typeOfEvent}\n ${form.numOfAnimals}\n ${form.date}\n ${form.nameOfPerson}\n ${form.phone}\n
            ${form.animal === `Cat` ? `feeder: ${form.feederName}\nfeeder phone: ${form.feederPhone}\nsterlized cats: ${form.sterlizedCats}
            \nunsterlized cats: ${form.unsterlizedCats}\n` : ""}  ${form.address}`}
          color={getColorByAnimalType(form.animal)}
          size={form.numOfAnimals} />)}
      </GoogleMap>
    </div>  
  )
}) 

export default Map