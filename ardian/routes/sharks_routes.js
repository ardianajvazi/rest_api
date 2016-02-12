const express = require('express');
const jsonParser = require('body-parser').json();
const Shark = require(__dirname + '/../models/sharks');
const handleDBError = require(__dirname + '/../lib/handle_db_error');

var sharkRouter = module.exports = exports = express.Router();

// getting all the sharks
sharkRouter.get('/sharks', (req, res) => {
  Shark.find({}, (err, data) => {
    if(err) return handleDBError(err, res);

    res.status(200).json(data);
  });
});

//creating a new shark
sharkRouter.post('/sharks', jsonParser, (req, res) => {
  var newShark = new Shark(req.body);
  newShark.save((err, data) => {
    if(err) return handleDBError(err, res);

    res.status(200).json(data);
  });
});

//deletes shark
sharkRouter.delete('/sharks/:id', (req, res) => {
  Shark.remove({_id: req.params.id}, (err) =>{
    if(err) return handleDBError(err, res);

    res.status(200).json({msg: 'success'});
  });
});

//updating shark
sharkRouter.put('/sharks/:id', jsonParser, (req, res) => {
  var updateShark = req.body;
  delete updateShark._id;
  Shark.update({_id: req.params.id}, updateShark, (err) => {
    if(err) return handleDBError(err, res);

    res.status(200).json({msg: 'success'})
  });
});
