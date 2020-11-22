const mongoose = require('mongoose')


const formSchema = new mongoose.Schema({                
    address: { type: String, required: true},
    date: { type: Date, required: true},
    typeOfEvent: {type: String, required: true},
    animal: { type: String, required: true},
    numOfAnimals: { type: Number, required: true},
    nameOfPerson: {type: String, required: true},
    phone: {type: String, required: false},
    lat: {type: Number, required: true},
    lng: {type: Number, required: true},
    feederName: {type: String, required: false},
    feederPhone: {type: String, required: false},
    sterilized: {type: Number, required: false},
    unsterilized: {type: Number, required: false}
})

formSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      //delete returnedObject.id
      delete returnedObject.__v
    }
})



module.exports = mongoose.model('Form', formSchema)