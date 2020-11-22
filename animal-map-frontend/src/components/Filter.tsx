import React from 'react';
import { Button, InputLabel, NativeSelect, TextField } from '@material-ui/core';
interface IProps  {
    animalFilter: string
    setAnimalFilter: any
    eventFilter: string
    setEventFilter: any
    startDateFilter: Date | undefined
    setStartDateFilter: any
    endDateFilter: Date | undefined
    setEndDateFilter: any
    setUseFilter: any
  }

const Filter = React.memo<IProps>((props) =>{
  const returnNormal = () =>{
    props.setUseFilter(false)
    props.setAnimalFilter("")
    props.setEventFilter("")
    props.setStartDateFilter(undefined)
    props.setEndDateFilter(undefined)
  }

  const eventsForAnimals = (animal: string) => {
    switch (animal){
      case "Cat" :
        return (
          <NativeSelect id="select" onChange = {(event) => props.setEventFilter(event.target.value)}>
            <option value=""></option>
            <option value="Feeded cats">Feeded cats</option>
            <option value="None Feeded cats">None Feeded cats</option>
            <option value="Giving Birth">Giving Birth</option>
          </NativeSelect>)
      case "Dog" :
        return (
          <NativeSelect id="select" onChange = {(event) => props.setEventFilter(event.target.value)}>
            <option value=""></option>
            <option value="Wondering dog without owner">Wondering dog without owner</option>
            <option value="Dog not on a leash with owner">Dog not on a leash with owner</option>
            <option value="Wondering and aggressive dog">Wondering and aggressive dog</option>
          </NativeSelect>)
      case "Fox" :
        return (
          <NativeSelect id="select" onChange = {(event) => props.setEventFilter(event.target.value)}>
            <option value=""></option>
            <option value="Seen from a distance">Seen from a distance</option>
            <option value="Seen with puppies">Seen with puppies</option>
            <option value="Seen and came closer">Seen and came closer</option>
            <option value="Seen aggressive/attacking">Seen aggressive/attacking</option>
          </NativeSelect>)
      case "Jackle" :
        return (
          <NativeSelect id="select" onChange = {(event) => props.setEventFilter(event.target.value)}>
            <option value=""></option>
            <option value="Seen from a distance">Seen from a distance</option>
            <option value="Seen with puppies">Seen with puppies</option>
            <option value="Seen and came closer">Seen and came closer</option>
            <option value="Seen aggressive/attacking">Seen aggressive/attacking</option>
          </NativeSelect>)
      case "" :
        return (
          <NativeSelect id="select" onChange = {(event) => props.setEventFilter(event.target.value)}>
            <option value=""></option>
          </NativeSelect>)                              
    }   
  }

  return (
    <div>
      <InputLabel htmlFor="select">Type of animal:</InputLabel>
      <NativeSelect id="select" value={props.animalFilter} onChange = {(event:any)=> props.setAnimalFilter(event.target.value)}>
        <option value=""></option>
        <option value="Cat">Cat</option>
        <option value="Fox">Fox</option>
        <option value="Dog">Dog</option>
        <option value="Jackle">Jackle</option>
      </NativeSelect>

      <InputLabel htmlFor="select">Type of event:</InputLabel>
      {eventsForAnimals(props.animalFilter)} 
      
      <TextField
        onChange = {(event:any)=> props.setStartDateFilter(event.target.value)}
        id="date"
        label="Start date:"
        type="datetime-local"
        value={props.startDateFilter? props.startDateFilter : "yyyy-mm-dd"}
        InputLabelProps={{
          shrink: true,
        }}/>

      <TextField
        onChange = {(event:any)=> props.setEndDateFilter(event.target.value)}
        id="date"
        label="End date:"
        type="datetime-local"
        value={props.endDateFilter? props.startDateFilter: "yyyy-mm-dd"}
        InputLabelProps={{
          shrink: true,
        }}/>

      <Button variant="contained" onClick={()=>props.setUseFilter(true)}>Filter</Button>
      <Button variant="contained" onClick={returnNormal}>Unfilter</Button>  
    </div>)
})

export default Filter