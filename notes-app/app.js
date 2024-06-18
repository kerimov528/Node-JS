const fs = require('fs');
const chalk = require('chalk')
const yargs = require('yargs')
const name = require('./utils.js')
const { getNotes, addNotes, listNotes, removeNotes } = require('./notes.js')


// Lesson 1


// fs.writeFileSync('output.txt', 'Hello World', 'utf8');

// fs.appendFileSync('output.txt', '\nMy Name is Anar Karimli', 'utf8');


// Lesson 2

// console.log(name)


// Lesson 3

// console.log(getNotes())


// Lesson 4


// console.log(chalk.red.inverse('Success!'))


// Lesson 5

// const command = process.argv[2]

// console.log(process.argv)
// console.log(yargs.argv)

// if (command === 'add') {
//     console.log('Adding Note!')
// } else if (command === 'remove') {
//     console.log('Removing Note!')
// } else {
//     console.log('Command not recognized!')
// }


// Lesson 6

// Creating add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note Body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        addNotes(argv.title, argv.body)
    }
})

// Creating remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        removeNotes(argv.title)
    }
})

// Creating list command
yargs.command({
    command: 'list',
    describe: 'List your notes',
    handler: function () {
        console.log('Listing out all notes!')
        listNotes()
    }
})

// Creating read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    handler: function () {
        console.log('Reading the note!')
        getNotes()
    }
})

console.log(yargs.argv)