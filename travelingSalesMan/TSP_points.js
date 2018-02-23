

const fs = require('fs');


//for developing I am just going to import one of the save collections
const getTraceList = function(name) {
  var obj = JSON.parse(fs.readFileSync('../savedCollections/'+name, 'utf8'));
  return obj
}

function shuffle (array) {
  //since passing in an array passing in by value
  var j = 0
    , temp = null

    var n = array.length -1
    while (n) {
      j = Math.floor(Math.random() * n)
      temp = array[n]
      array[n] = array[j]
      array[j] = temp
      n -= 1
    }
    return array
}

function randomInt (max) {
  return Math.floor(Math.random() * max)
}

//just going to start with euclidean dist for now as fitness
//that is no weights for x,y,z movements
//if you want to weight the the different distances values do it here
function costFunction (pt1,pt2) {
  const xCost = 1
  const yCost = 1
  const zCost = 1

  return parseFloat(Math.sqrt(xCost*Math.pow((pt1.x - pt2.x),2)+
    yCost*Math.pow((pt1.y - pt2.y),2)+
    zCost*Math.pow((pt1.z - pt2.z),2)))
}

const Chromosome = (points) => {
  var points = points
  var fitness = points.reduce((acc,curVal,curIn) => {
    if (curIn != points.length - 1 ) {
      // console.log(acc)
      return acc + costFunction(curVal,points[curIn+1])
    }
    return acc
  },0)

  return {
    fitness: fitness,
    points: points

  }
}


function makeChildPoints (parent1,parent2)  {

  // console.log('parent',parent1)
  var index = Math.floor(Math.random()*(parent1.points.length-1))
  // console.log('cross index',index)
  var childPts = parent1.points.slice(0,index)
  var parent1Part = parent1.points.slice(0,index)
  //note that this comparison only works because they are point objects
  // console.log('childPts',childPts)
  parent2.points.forEach((i) => {
    if (parent1Part.find((ele) => {return ele === i} ) == undefined ) {
      childPts.push(i)
    }
  })
    return childPts

  }

function sortPopulation (array) {
  array.sort(function(a,b) {
    if (a.fitness > b.fitness ) {
      return 1;
    }
    if (a.fitness < b.fitness) {
      return -1;
    }
    return 0
  })
}


function getGeneticPath (traceList,popSize) {

  //when creating the intial pooulation it might be best to just simply mix up the order of the traces
  var keys = Object.keys(traceList)
  const mutate = .15
  var population = []
  for (var i = 0; i < popSize; i+= 1) {
    var pts = []
      keys.forEach((trace) => {
       shuffle(traceList[trace].points).forEach((pt) => pts.push(pt))

    })
    population.push(Chromosome(pts))
    // console.log(i)
  }

  var probList = new Array(popSize)

  for (var i = 0 ; i < popSize ; i += 1 ) {
    if (i < 2) { probList[i] = 8*(1/popSize) }
    else if (i < popSize/2) { probList[i] = 4*(1/popSize) }
    else { probList[i] = (1/popSize) }
  }

  //now normalize
  var sum = probList.reduce((total,num) => {return total+num})
  probList = probList.map((i) => {return i/sum})
  // console.log(probList)

  function getParent() {
    var prob = Math.random()
    var total = 0
    for (var i = 0 ; i < popSize ; i += 1) {
      if (prob < total) {
        return population[i-1]
      }
      total += probList[i]
    }
    return population[popSize-1]
  }



  // population.forEach(i => console.log(i.fitness))

//---------------------------- repreated steps-------------------
  for (var count = 0 ; count < 5000 ; count += 1 ) {
    //Making next generation
        var newGen = []
        while (newGen.length < popSize) {
          //first sort
          sortPopulation(population)


          //select parent
          var p1 = getParent()
          var p2 = getParent()

          var child = makeChildPoints(p1,p2)
          // console.log(child)
          //determine if child should mutate
          if (Math.random() < mutate) {
            // console.log('mutate')

            for ( var i = 0 ; i < popSize/5 ; i += 1) {
              var in1 = Math.floor(Math.random()*(child.length-1))
              var in2 = Math.floor(Math.random()*(child.length-1))
              if (in1 != in2) {
                var temp = child[in1]
                child[in1] = child[in2]
                child[in2] = temp
              }
            }

          }
          //add to list

          newGen.push(Chromosome(child))
        }
        // population.forEach(i => console.log(i.fitness))

        population = newGen
        if (count%100 == 0) {
          sortPopulation(population)
          console.log(count)
          for (var i = 0 ; i < 10 ; i += 1) {
            console.log(population[i].fitness)
          }
          console.log()
        }
  }
    sortPopulation(population)

    for (var i = 0 ; i < 10 ; i += 1) {
      console.log(population[i].fitness)
    }
    // population.forEach(i => console.log(i.fitness))
    // console.log(population[0].points)


}

getGeneticPath(getTraceList('square.json'),50)
