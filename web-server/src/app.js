const path = require('path');
const express = require('express');
const handlebars = require('express-handlebars');

const app = express();  // create an express 

const publicDirectoryPath = path.join(__dirname, '../public');  // set the path of the public directory

app.set('view engine', 'handlebars');  // set the view engine to handlebars
app.engine('handlebars', handlebars({ extname: 'handlebars', layoutsDir: __dirname + '/views' }));  // set the view engine to handlebars

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather APP',
        name: 'Andrew Mead'
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});