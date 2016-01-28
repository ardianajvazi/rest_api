// const express = require('express');
// const jsonParser = require('body-parser').json();
// const People = require(__dirname + '/../models/people');
// const handleDBError = require(__dirname + '/../lib/handle_db_error');
//
// var peopleRouter = module.exports = exports = express.Router();
//
// // getting all the people
// peopleRouter.get('/people', (req, res) => {
//   People.find({}, (err, people) => {
//     if(err) {
//       return handleDBError(err, res);
//     }
//     res.status(200).json(people);
//   });;
// });
//
// //creating a new people
// peopleRouter.post('/people', jsonParser, (req, res) => {
//   var newPeople = new People(req.body);
//   newPeople.save((err, people) => {
//     if(err) {
//       return handleDBError(err, res);
//     }
//     res.status(200).json({msg: "People added"});
//   });
// });
//
// //updating people
// peopleRouter.put('/people/:id', jsonParser, (req, res) => {
//   var updatePeople = req.body;
//   delete updatePeople._id;
//   People.update({_id: req.params.id}, updatePeople, (err) => {
//     if(err) {
//       return handleDBError(err,res);
//     }
//     res.status(200).json({msg: 'Shark updated'})
//   });
// });
//
// //deletes people
// peopleRouter.delete('/people/:id', (req, res) => {
//   Shark.remove({_id: req.params.id}, (err) =>{
//     if(err){
//       return handleDBError(err, res);
//     }
//     res.status(200).json({msg: 'Shark has been killed'});
//   });
// });
