var calculations = require('./calculations')

var Trace = function() {
  this.pointList =[]
  this.traceList = {
    'Origin':{type:'Origin',params:{x:0,y:0,z:0},points:[{x:0,y:0,z:0}]}
  }
}



//TODO: add in error checking of the params
generatePoints = (type,params) => {
  switch (type) {
    case 'point':
      return [params]
      break;
    case 'line':
      return calculations.calculateLine(params.pt1,params.pt2)
      break;

    case 'circle':
      return calculations.calculateCircle(params.center,
        params.radius,params.zenith,params.azimuth,params.step)
      break;

    case 'circle_polar':
      return calculations.calculateCircle_Polar(params.distance,
        params.radius,params.zenith,params.azimuth,params.step)
      break;
    case 'sphere':
      return calculations.calculateSphere(params.distance,
        params.radius,params.zenith,params.azimuth,params.step)
      break;

    case 'rectangle':
      return calculations.calculateRectangle(params.pt1,params.pt2,params.pt3)
      break;
    case 'rectangle_polar':
      return calculations.calculateRectangle_Polar(params.zenith,params.azimuth,
        params.distance,params.width,params.length)
      break;

    default:
      return null

  }
}

/*trace object format
{ type: '', params: {}, points: [{}]}

traceList is made of trace objects
*/

//TODO:: add in the correct error code and handeling
Trace.prototype.createTrace = function(newTrace ,callback) {
  //parse type and call correct function
  var newPoints = generatePoints(newTrace.type,newTrace.params)
  console.log(newPoints)
  //error checking
  if (newPoints === null) {
    callback({error:['Points not generated']})
    return
  }

  //generateNew trace id
  var newId = newTrace.type + '-' + Math.floor(Math.random() * (1000 - 0) + 0);

  //check to see if id is taken if not create new one
  while (Object.keys(this.traceList).find((item) => item === newId)) {
    newId = newTrace.type + '-' + Math.floor(Math.random() * (1000 - 0) + 0);
  }

  //add new trace
  this.traceList[newId] = {type:newTrace.type, params:newTrace.params, points:newPoints}

  console.log(this.traceList);
  callback(null,{id:newId, points:newPoints})
}


Trace.prototype.getTrace = function(id, callback) {
  if (this.traceList[id] !== null) {
    callback(null, this.traceList[id])
  }
  else {
    callback({error: ['Trace Not Found']})
  }
}

Trace.prototype.deleteTrace = function(traceId, callback) {
  if (this.traceList[traceId] !== null) {
    var oldTraceParams = {type:this.traceList[traceId].type, params:this.traceList[traceId].params}
    delete this.traceList[traceId]
    callback(null, oldTraceParams);
  }
  else {
    return new Error('Trace out of index');
  }
}

Trace.prototype.deleteAll = function(callback) {
  var o = this.traceList['Origin']
  this.traceList = {}
  this.traceList['Origin'] = o
  callback(null,this.traceList)
}

Trace.prototype.editTrace = function(traceId, newTrace, callback) {
  if (this.traceList[traceId] !== null) {
    console.log(traceId)
    var newPoints = generatePoints(newTrace.type,newTrace.params)
    this.traceList[traceId] = {type:newTrace.type, params:newTrace.params, points:newPoints}
    callback(null,{id:traceId, points:newPoints})
  }
  else {
    callback({error: ['trace id is invalid']})
  }
}

module.exports = new Trace();
