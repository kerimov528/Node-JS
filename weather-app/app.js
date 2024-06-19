const request = require('request');

const url = 'https://api.openweathermap.org/data/3.0/onecall/day_summary?lat=39.099724&lon=-94.578331&date=2020-03-04&appid=f852e7c6839e615cdf8330519ef05c02';

request(url, { json: true }, (err, res, body) => {

    if (err) { return console.log(err); }

    console.log(body);

});

