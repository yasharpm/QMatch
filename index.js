const express = require("express")
const vash = require("vash")
const fs = require('fs')

var app = express()

function getMatches(groupA, groupB, scores) {
    const sortedIndices = Array.from(scores.keys()).sort((a, b) => scores[b] - scores[a])
    const size = groupA.length;
    let remainingMatches = size;
    for (let i in sortedIndices) {
        const index = sortedIndices[i]
        const aIndex = Math.floor(index / size)
        const bIndex = index - aIndex * size

        if (groupA[aIndex].match != -1) {
            continue
        }

        if (groupB[bIndex].match != -1) {
            continue
        }

        groupA[aIndex].match = bIndex
        groupB[bIndex].match = aIndex;
        remainingMatches--

        if (remainingMatches == 0) {
            break
        }
    }
}

function getVash(name) {
    return vash.compile(fs.readFileSync('./template/' + name + '.html').toString())
}

app.get("/create", function(request, response) {
    response.send(getVash('create')())
})

app.get("/",function(request,response) {
    const groupA = [{match:-1}, {match:-1}, {match:-1}]
    const groupB = [{match:-1}, {match:-1}, {match:-1}]
    const scores = [3, 4, 5, 1, 2, 3, 2, 3, 1]
    getMatches(groupA, groupB, scores)



    response.send("Hello World! " + JSON.stringify(groupA) + " \n " + JSON.stringify(groupB))
})

app.listen(8000, 
    function () {
        console.log("Started application on port %d", 8000)
    });