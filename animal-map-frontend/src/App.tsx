import React, { useState, useEffect } from 'react';
import Map from "./components/Map";
import Form from "./components/Form"
import { Button } from '@material-ui/core';
import Filter from './components/Filter'
import service from './components/axios'

export interface cordi{
    lat: number | undefined
    lng: number | undefined
}

const App = React.memo(()=>{
  const [form, setForm] = useState({address:"", date: undefined, animal: "Cat", numOfAnimals: 0, typeOfEvent: "",
                                  nameOfPerson: "", phone: "", lat: 0, lng: 0, feederName: "", feederPhone: "", sterlizedCats: 0, unsterlizedCats: 0 })
  const [show, setShow] = useState<boolean>(false)
  const [markers, setMarkers] = useState<object[]>([])  
  const [cordinates, setCordinates] = useState<cordi>({lat: undefined, lng: undefined})
  const [animalFilter, setAnimalFilter] = useState<string>("")
  const [eventFilter, setEventFilter] = useState<string>("")
  const [startDateFilter, setStartDateFilter] = useState<Date|undefined>(undefined)
  const [endDateFilter, setEndDateFilter] = useState<Date|undefined>(undefined)
  const [useFilter, setUseFilter] = useState<boolean>(false)

  useEffect(() => {
      console.log('effect')
      service.getAll().then((forms) => setMarkers(forms))
    }, [])
  
  if (show){
    return (<Form cordinates={cordinates} setShow = {setShow} form={form} setForm= {setForm} 
      markers={markers} setMarkers={setMarkers} />)
  }
  else{
    return (
      <div>
        <div>
          <Button variant="contained" onClick={() => setShow(!show)}>Fill a form</Button>
        </div>
        <div>
          <Filter animalFilter={animalFilter} setAnimalFilter={setAnimalFilter} eventFilter={eventFilter}
            setEventFilter={setEventFilter} startDateFilter={startDateFilter} setStartDateFilter={setStartDateFilter} 
            endDateFilter={endDateFilter} setEndDateFilter={setEndDateFilter} setUseFilter={setUseFilter}/>
        </div>
        <div>
          <Map toShow={setShow} markers={markers} setMarkers={setMarkers} setCordinates={setCordinates} useFilter={useFilter}
            animalFilter={animalFilter} eventFilter={eventFilter} startDateFilter={startDateFilter} endDateFilter={endDateFilter} />
        </div>
      </div>)
  }
})

export default App;