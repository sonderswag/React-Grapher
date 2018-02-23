var express = require('express');
var app = express();
var fileRouter = express.Router();

var Trace = require('../models/Trace');
const fs = require('fs');

fileRouter.route('/').post(function (req, res) {

  var name = Object.keys(req.body)[0]
    console.log(name+'.json')
  fs.writeFile('../savedCollections/'+name+'.json', JSON.stringify(Trace.traceList,null,2),'utf-8', (err) => {
    if (err) {
      res.json(err)
      return
    }
    res.json(null)
  });
})

fileRouter.route('/').get(function (req, res) {
  fs.readdir('../savedCollections',(err,files) => {

    if (err) {
      res.json(err)
      return
    }
    res.json(files.slice(1))
  })

  //TODO:: add in error checking for wrong name
  fileRouter.route('/:name').get(function (req,res) {
    // get the json objecet
    try {
      var obj = JSON.parse(fs.readFileSync('../savedCollections/'+req.params.name, 'utf8'));

      //replace the traceList
      Trace.traceList = obj;
      console.log('loaded',req.params.name)
      //return the traceList
      res.json(obj)
    } catch(err) {
      res.status(400)
      res.json({error:[err]})
    }

  })
})


  fileRouter.route('/:name').delete(function (req,res) {
    try {
      fs.unlinkSync('../savedCollections/'+req.params.name)
      res.json({message:'Done'})
    } catch(err) {
      res.status (400)
      res.json({error:[err]})
    }

  })

module.exports = fileRouter
