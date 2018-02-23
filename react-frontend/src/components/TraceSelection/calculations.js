//function for pulling points for easy to read storage to the format plotly ueses
// [{x:1, y:2, z:3 },{x:4, y:5, z:6 }] => x:[1,4], y:[2,5], z:[3,6]
export const extractPoints = function(points) {
  var xSet = [], ySet = [], zSet = [];
  points.forEach((point) => {
    xSet.push(point.x); ySet.push(point.y); zSet.push(point.z)
  })
  return {x:xSet, y:ySet, z:zSet};
}
