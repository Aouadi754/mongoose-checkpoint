const Person = require("../Models/Person");
const express = require("express");
const router = express.Router();

// Create and Save a Record of a Model
router.post('/', (req, res) => {
    
    let First_Person = new Person(req.body)
    First_Person.save()
        .then(person => res.send(person))
        .catch(err => console.log(err.message))
        
})
// Create Many Records with model.create()
router.post('/people', (req, res) => {
    
     Person.create(req.body)
        .then(people => res.send(people))
        .catch(err => console.log(err.message))
})
// Use model.find() to Search Your Database
router.get('/people/:name', (req, res) => {
    
    Person.find({name:req.params.name})
       .then(result => res.send(result))
       .catch(err => console.log(err.message))
})
// Use model.findOne() to Return a Single Matching Document from Your Database
router.get('people/Foods/:Food/', (req, res) => {
    Person.findOne({favoriteFoods: req.params.Food })
    .then(person => res.send(person))
    .catch(err => console.log(err.message))
})
// Use model.findById() to Search Your Database By _id
router.get('people/:_id/', (req, res) => {
    Person.findById(req.params._id)
    .then(person => res.send(person))
    .catch(err => console.log(err.message))
})
//Perform Classic Updates by Running Find, Edit, then Save
router.put('people/update/:_id/', (req, res) => {
    Person.findById(req.params._id)
    .then(person => {person.favoriteFoods.push("Hamburger");
    person.save
.then(result=>res.send(result))})
    
    .catch(err => console.log(err.message))
})

// Perform New Updates on a Document Using model.findOneAndUpdate()
router.put('/people/findOneAndUpdate/:name', (req, res) => {
    Person.findOneAndUpdate({name: req.params.name},
        {$set: {age: req.body.age}},
        {
            new: true,                       
            runValidators: true              
          })
    .then(person => res.send(person))
    .catch(err => console.log(err.message))
})
// Delete One Document Using model.findByIdAndRemove
router.delete('/people/findOneAndRemove/:_id', (req, res) => {
    Person.findByIdAndRemove(req.params._id)
    .then(response => res.send("One Person is deleted with success"))
      .catch(err => {
        console.error(err)
})
})
// MongoDB and Mongoose - Delete Many Documents with model.remove()
router.delete('/people/Remove/', (req, res) => {
    Person.remove({ name: 'mary' })
        .then(person => res.send({NumberOfPersonDeleted: person.deletedCount}))
        .catch(err => console.log(err.message))
  })
//   Chain Search Query Helpers to Narrow Search Results
router.get('/people/helpers/:food', (req, res) => {
    Person.find({favoriteFoods : req.params.food})                  
        .sort({name: 1})         
         .limit(2)                
         .select({age: false} )
         .exec((err , users)  => {
             if(err ) console.log(err)
             else res.send(users)
         })                   
        })





module.exports = router