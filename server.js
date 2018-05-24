/*jshint esnext: true */
/*jslint node: true */

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('vew engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method}: ${req.url}`;
    
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
       if (err) {
           console.log('Unable to append to server.log.');
       } 
    });
    next();
});

//app.use((req, res, next) => {
//   res.render('maintence.hbs'); 
//});

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
                    return new Date().getFullYear();
                   });

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my new website, build with Express'
    });
});

app.get('/about', (req, res) => {
    res.render('About.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', (req, res) => {
   res.send({
      errorMessage: 'Unable to handle this request' 
   }); 
});

app.listen(3000, () => {
    console.log('Serving is starting on port 3000');
});


