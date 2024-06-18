const fs = require('fs')

// const book = {
//     title: 'Ego is the Enemy',
//     author: 'Ryan Holiday'
// }

// const bookJSON = JSON.stringify(book)
// fs.writeFileSync('1-json.json', bookJSON)

// const bufferData = fs.readFileSync('1-json.json')
// console.log(bufferData)

// const dataJSON = bufferData.toString()
// const data = JSON.parse(dataJSON)

// console.log(data.title)


// Lesson 2 - Challenge

const dataBuffer = fs.readFileSync('1-json.json')
const dataJSON = dataBuffer.toString()
const user = {
    name: 'Anar',
    planet: 'Earth',
    age: 25
}

const userJSON = JSON.stringify(user)

fs.writeFileSync('1-json.json', userJSON)