

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

//just going to start with euclidean dist for now as fitness
//that is no weights for x,y,z movements
//if you want to weight the the different distances values do it here
function weightDistance (pt1,pt2) {
  const xCost = 1
  const yCost = 1
  const zCost = 1

  return parseFloat(Math.sqrt(xCost*Math.pow((pt1.x - pt2.x),2)+
    yCost*Math.pow((pt1.y - pt2.y),2)+
    zCost*Math.pow((pt1.z - pt2.z),2)))
}

function makeChromesome (traceArr) {
  var fitness = traceArr.reduce((acc,curVal,curIn) => {
      if (curIn == traceArr.length - 1) {
        return acc + curVal.fitness
      }
      return acc + weightDistance(curVal.points[curVal.points.length - 1],traceArr[curIn+1].points[0]) + curVal.fitness
    },0)
  var array = traceArr
return {
  fitness: fitness,
  array: array,
}

}




function getGeneticPath (traceList,popSize) {
  var mutate = .2
  var chromosomeArray = new Array(popSize)
  var probArray = new Array(popSize)

  var keys = Object.keys(traceList)

  //------------------------------------------- init -----------------------------------------
  //adding distance fitness for each trace
  keys.forEach((key) => {
    var trace = traceList[key]
    trace.fitness = trace.points.reduce((acc,curVal,curIn) => {
      if (curIn != trace.points.length - 1 ) {
        return acc + weightDistance(curVal,trace.points[curIn+1])
      }
      return acc
    },0)
  } )

  //generating new chromesomes
  for (var i = 0; i < popSize; i+= 1) {
      var traceArr = shuffle(keys).map((key) => {return traceList[key]})
      chromosomeArray.push(makeChromesome(traceArr))
  }

  //generate probability array once
  for (var i = 0 ; i < popSize ; i += 1 ) {
    if (i < 2) { probArray[i] = 5*(1/popSize) }
    else if (i < popSize/2) { probArray[i] = 2*(1/popSize) }
    else { probArray[i] = (1/popSize) }
  }

  //now normalize
  var sum = probArray.reduce((total,num) => {return total+num})
  probArray = probArray.map((i) => {return i/sum})


// -------------------------------------------- helper functions --------------------------

  function getParent () {
    var prob = Math.random()
    var total = 0
    for (var i = 0 ; i < popSize ; i += 1) {
      if (prob < total) {
        return chromosomeArray[i-1]
      }
      total += probArray[i]
    }
    return chromosomeArray[popSize-1]
  }

  function makeChild (parent1,parent2) {
    //could do it here but I want the code to be more readable
    // console.log('parent',parent1)
    var index = Math.floor(Math.random()*(parent1.array.length-1))
    // console.log('cross index',index)
    var child = parent1.array.slice(0,index)
    var parent1Part = parent1.array.slice(0,index)
    //note that this comparison only works because they are point objects
    parent2.array.forEach((i) => {
      if (parent1Part.find((ele) => {return ele === i} ) == undefined ) {
        child.push(i)
      }
    })
      return child
  }

  function sort () {
    chromosomeArray.sort(function(a,b) {
      // console.log('a',a.fitness)
      if (a.fitness > b.fitness ) {
        return 1;
      }
      if (a.fitness < b.fitness) {
        return -1;
      }
      return 0
    })
  }

function print () {
  sort()
  console.log(count)
  for (var i = 0 ; i < 10 ; i += 1) {
    console.log(chromosomeArray[i].fitness)
  }
  console.log()
}

function checkGraph () {
  var sameCount = {}
  for (var i = 0; i < popSize ; i+= 1) {
    var fit = chromosomeArray[i].fitness
    sameCount[fit] = (sameCount[fit] ? sameCount[fit]+1 : 1)
  }
  var max = 0
  Object.keys(sameCount).forEach((key) => {
    ele = sameCount[key]
    if (ele > max) max = ele
  })
  if (max >= popSize/2) {
    console.log('max',max)
    for (var i = Math.floor(popSize/4) ; i < popSize ; i+= 1) {
      chromosomeArray[i] = makeChromesome(shuffle(chromosomeArray[i].array))
    }
  }
}

// --------------------------------------------- getPath ----------------------------------------------

  // population.forEach(i => console.log(i.fitness))

var maxFitness = null

//---------------------------- repreated steps-------------------
  for (var count = 0 ; count < 1000 ; count += 1 ) {
    //Making next generation
        var newGen = []
        while (newGen.length < popSize) {
          sort()

          var p1 = getParent()
          var p2 = getParent()
          var childArray = makeChild(p1,p2)

          // console.log(child)
          //determine if child should mutate
          if (Math.random() < mutate) {
            // console.log('mutate')
            var in1 = Math.floor(Math.random()*(childArray.length-1))
            var in2 = Math.floor(Math.random()*(childArray.length-1))
            if (in1 != in2) {
              var temp = childArray[in1]
              childArray[in1] = childArray[in2]
              childArray[in2] = temp
            }
          }
          //add to list
          var c = makeChromesome(childArray)
          // console.log(p1.fitness,p2.fitness,c.fitness)
          newGen.push(c)
        }
        // population.forEach(i => console.log(i.fitness))
        // console.log()
        chromosomeArray = newGen.slice()

        if (count%500 == 0) {
          //prevent backslip
          print()
          checkGraph()

        }

  }
  print()
    // population.forEach(i => console.log(i.fitness))
    // console.log(population[0].points)


}

getGeneticPath(getTraceList('beam.json'),50)
