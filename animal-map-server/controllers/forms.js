const formsRouter = require('express').Router()
const Form = require('../models/form')

formsRouter.get('/', async (request, response) => {
  const forms = await Form
    .find({})
  response.json(forms)
})

formsRouter.post('/', async (request, response) => {
  const body = request.body  
  console.log("this is body: ", body)
  const form = new Form({
    address: body.address,
    date: body.date,
    typeOfEvent: body.typeOfEvent,
    animal: body.animal,
    numOfAnimals: body.numOfAnimals,
    nameOfPerson: body.nameOfPerson,
    phone: body.phone,
    lat: body.lat,
    lng: body.lng,
    feederName: body.feederName,
    feederPhone: body.feederPhone,
    sterilized: body.sterilizedCats,
    unsterilized: body.unsterilizedCats
  })
    const savedForm = await form.save()
    response.json(savedForm)
  
})

formsRouter.delete('/:id', async (request, response) => {
    await Form.findByIdAndRemove(request.params.id)
    response.status(204).end()
  })

  module.exports = formsRouter;
