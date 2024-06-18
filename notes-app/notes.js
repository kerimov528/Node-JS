const { default: chalk } = require('chalk');
const fs = require('fs');

function getNotes() {
    try {
        const bufferData = fs.readFileSync('notes.json');
        const dataJSON = bufferData.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
}

function addNotes(title, body) {
    const notes = getNotes();
    const duplicateNotes = notes.filter((note) => note.title === title);

    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        return 'New note added!';
    } else {
        return 'Note title taken!';
    }
}

function saveNotes(notes) {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

function removeNotes(title) {
    const notes = getNotes();
    const notesToKeep = notes.filter((note) => note.title !== title);
    saveNotes(notesToKeep);

    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note removed!'));
    } else {
        console.log(chalk.red.inverse('No note found!'));
    }
}

function listNotes() {
    const allNotes = getNotes();
    allNotes.forEach((note) => {
        console.log(note.title);
    });
}

module.exports = {
    getNotes,
    addNotes,
    removeNotes,
    listNotes
};