

//calculate the distance between two Cartesian
//pt = {x: , y:, z: } or {x: y: }
distance = function(pt1, pt2) {
  var retValue = 0;
  var xDist = pt1.x-pt2.x
  var yDist = pt1.y-pt2.y
  retValue = Math.sqrt(xDist*xDist + yDist*yDist)
  if (Object.keys(pt1).length === 3 && Object.keys(pt2).length === 3) {
    var zDist = pt1.z-pt2.z
    return Math.sqrt(retValue*retValue + zDist*zDist)
  }
  return retValue
}


//to calculate the the points along the line
//will simply return the points in an array each 1 unit apart
//parametric equation: P+distance*û ; where û is the unit direction vector of the line
var calculateLine = exports.calculateLine = function(pt1, pt2) {
  // var xyDist = distance({x:pt1.x,y:pt1.y},{x:pt2.x,y:pt2.y})
  var dist = distance(pt1,pt2)
  // console.log(dist)
  var dirVector = {x:(pt2.x-pt1.x)/dist,y:(pt2.y-pt1.y)/dist,z:(pt2.z-pt1.z)/dist}
  // console.log(dirVector)
  var x,y,z
  var retValue = []
  for (var r = 0 ; r < dist ; r++ ) {
    //round here if you want only discrete points
    // console.log(r)
    x = pt1.x + r*dirVector.x
    y = pt1.y + r*dirVector.y
    z = pt1.z + r*dirVector.z
    retValue.push({x:x,y:y,z:z})
  }
  retValue.push({x:pt2.x,y:pt2.y,z:pt2.z})
  return retValue
  // console.log(retValue)
}

exports.calculateSphere = function(distance,radius,zenith,azimuth, step) {
  if (step === undefined ) {
    step = 1
  }

  var xOffset = distance*Math.sin(zenith*(Math.PI/180))*Math.cos(azimuth*(Math.PI/180))
  var yOffset = distance*Math.sin(zenith*(Math.PI/180))*Math.sin(azimuth*(Math.PI/180))
  var zOffset = distance*Math.cos(zenith*(Math.PI/180))

  var retValue = []
  for (var i = 0 ; i <= 360 ; i+=step) {
    for (var j = 0 ; j<= 360 ; j+=step) {
      Rz = j*(Math.PI/180)
      Rx = i*(Math.PI/180)
      var x = xOffset+radius*Math.sin(Rz)*Math.cos(Rx)
      var y = yOffset+radius*Math.sin(Rz)*Math.sin(Rx)
      var z = zOffset+radius*Math.cos(Rz)

      console.log(i,j)
      retValue.push({x:x,y:y,z:z})
    }
  }

  return retValue

}


exports.calculateCircle_Polar = function(distance,radius,zenith,azimuth, step) {
  //simply need to find the center point then call the other circle function
  var x,y,z,r
  zenith1 = zenith*(Math.PI/180)
  azimuth1 = azimuth*(Math.PI/180)
  r = Math.sin(zenith1)*distance
  z = Math.cos(zenith1)*distance
  x = Math.cos(azimuth1)*r
  y = Math.sin(azimuth1)*r
  console.log(x,y,z)
  return calculateCircle({x:x,y:y,z:z},radius,zenith,azimuth,step)

}

//this calculate the points to create a circle in 3d. It allows for the circle to be skewed with a
//zenith angle and a azimuth angle
//parameteric equation: r*cos(t)*û + r*sin(t)*ñxû + C
// u is any vector perpendicular to the normal vector and in the plane of the circle
var calculateCircle = exports.calculateCircle = function(center, radius, zenith, azimuth, step) {
  if (step === undefined ) {
    step = 1
  }
  // console.log(center)
  zenith = zenith*(Math.PI/180)
  azimuth = azimuth*(Math.PI/180)
  var x,y,z,i,radian
  var retValue = []
  for (i = 0 ; i < 360 ; i+=step) {
    radian = i*(Math.PI/180)
    x = radius*Math.cos(radian)*Math.sin(azimuth)+radius*Math.sin(radian)*Math.cos(zenith)*Math.cos(azimuth)+center.x
    y = -radius*Math.cos(radian)*Math.cos(azimuth)+radius*Math.sin(radian)*Math.cos(zenith)*Math.sin(azimuth)+center.y
    z = -radius*Math.sin(radian)*Math.sin(zenith)+center.z
    retValue.push({x:x,y:y,z:z})
  }
  return retValue;
}

exports.calculateRectangle_Polar = function(zenith,azimuth,distance,width,length) {

  zenith = zenith*(Math.PI/180)
  azimuth = azimuth*(Math.PI/180)
  //first get 4 courners in the prime frame
  var pt1,pt2,pt3,pt4;
  pt1 = {x:.5*width,y:.5*length,z:0}
  pt2 = {x:.5*width,y:-.5*length,z:0}
  pt3 = {x:-.5*width,y:-.5*length,z:0}
  pt4 = {x:-.5*width,y:.5*length,z:0}

  //function for transforming a pt in original plain to roatated plan
  //may move it out in the future
  var transform = function(pt) {
    pt.z += distance
    var x =  pt.x*Math.cos(azimuth)-pt.y*Math.cos(zenith)*Math.sin(azimuth)+pt.z*Math.sin(zenith)*Math.sin(azimuth)
    var y =  pt.x*Math.sin(azimuth)+pt.y*Math.cos(zenith)*Math.cos(azimuth)-pt.z*Math.sin(zenith)*Math.cos(azimuth)
    var z =                         pt.y*Math.sin(zenith)                  +pt.z*Math.cos(zenith)
    console.log({x:x,y:y,z:z})
    return {x:x,y:y,z:z}
  }

  pt1 = transform(pt1)
  pt2 = transform(pt2)
  pt3 = transform(pt3)
  pt4 = transform(pt4)

  //connect the dots
  var retValue = calculateLine(pt1,pt2)
  calculateLine(pt2,pt3).forEach((ele) => {
    retValue.push(ele)
  })
  calculateLine(pt3,pt4).forEach((ele) => {
    retValue.push(ele)
  })
  calculateLine(pt4,pt1).forEach((ele) => {
    retValue.push(ele)
  })


   return retValue
}


exports.calculateRectangle = function(pt1,pt2,pt3) {
  //first need to find the 4th point in the square

  //find distance between the 3 points
  //and then find the max distance, this is the diagonal of the square
  var arrangement = [
    {dist:distance(pt1,pt2),middle:pt3,c1:pt1,c2:pt2},
    {dist:distance(pt1,pt3),middle:pt2,c1:pt1,c2:pt3},
    {dist:distance(pt2,pt3),middle:pt3,c1:pt2,c2:pt3}
  ]
  var max = arrangement[0].dist
  var maxIndex = 0
  for (const i in arrangement) {
    if (arrangement[i].dist > max) {
      maxIndex = i
      max = arrangement[i]
    }
  }
 var setup = arrangement[maxIndex]

 //now now the arrangement of the points can calculate the 4th point
 //by subtracting the vectors from the middle point
 //c1 -> middle
 var c1_middle = {
   x:setup.middle.x-setup.c1.x,
   y:setup.middle.y-setup.c1.y,
   z:setup.middle.z-setup.c1.z
 }
console.log(c1_middle)
 var c2_middle = {
   x:setup.middle.x-setup.c2.x,
   y:setup.middle.y-setup.c2.y,
   z:setup.middle.z-setup.c2.z
 }
console.log(c2_middle)
 var pt4 = {
   x:setup.middle.x-c1_middle.x-c2_middle.x,
   y:setup.middle.y-c1_middle.y-c2_middle.y,
   z:setup.middle.z-c1_middle.z-c2_middle.z,
 }
 console.log(pt4)

 //now connect the dots
 var retValue = calculateLine(setup.c1,setup.middle)
 calculateLine(setup.middle,setup.c2).forEach((ele) => {
   retValue.push(ele)
 })
 calculateLine(setup.c2,pt4).forEach((ele) => {
   retValue.push(ele)
 })
 calculateLine(pt4,setup.c1).forEach((ele) => {
   retValue.push(ele)
 })


  return retValue
}
