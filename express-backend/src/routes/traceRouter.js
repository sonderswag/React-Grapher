var express = require('express');
var app = express();
var traceRouter = express.Router();

var Trace = require('../models/Trace');
const fs = require('fs');

// POST
traceRouter.route('/').post(function (req,res) {
  //message format: {type: '', params: ''}

  console.log('adding Trace',req.body);
  Trace.createTrace(req.body, (err,trace) => {
    if (err) {
      console.log(err);
      res.status(400)
      res.json(err)
      return
    }
    res.json(trace)
  });

})

//GET

//this is where the server handles get commands
traceRouter.route('/').get(function (req,res) {
  //request all of the data list in order
  console.log('getting a request for the traceList')
  console.log(Trace.traceList)
  res.json(Trace.traceList)
});

traceRouter.route('/ids').get(function(req,res) {
  console.log('getting request for trace ids')

  console.log(Object.keys(Trace.traceList))
  res.json(Object.keys(Trace.traceList))
})

traceRouter.route('/:id').get(function (req, res) {
  console.log('request to get', req.params)
  Trace.getTrace(req.params.id, (err, trace) => {
    if (err) {
      console.log(err);
      res.status(400)
      res.json(err);
      return
    }
    console.log(trace)
    res.json(trace);
  })
});

//PATCH
traceRouter.route('/:id').patch(function (req,res) {
  console.log('request to update', req.body)
  if(req.body === undefined) {
    req.json({error:['undefined body']})
    return
  }

  Trace.editTrace(req.params.id, req.body, (err,newTrace) => {
    if (err) {
      console.log(err);
      res.status(400)
      res.json(err);
      return
    }
    console.log(newTrace);
    res.json(newTrace);
  })
});

//DELETE
traceRouter.route('/:id').delete(function (req, res) {
  console.log('request to delete', req.params)
  Trace.deleteTrace(req.params.id, (err, traceList) => {
    if (err) {
      console.log(err);
      res.status(400)
      res.json(err);
      return
    }
    console.log(traceList)
    res.json(traceList);
  })
});

traceRouter.route('/').delete(function (req, res) {
  console.log('request to delete all')
  Trace.deleteAll((err, traceList) => {
    if (err) {
      console.log(err);
      res.status(400)
      res.json(err);
      return
    }
    console.log(traceList)
    res.json(traceList);
  })
});


module.exports = traceRouter;
