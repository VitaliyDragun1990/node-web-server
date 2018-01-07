const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// define PORT environment  variable for heroku deployment
const port = process.env.PORT || 3000;
const app = express();

// register directory for partials like footer.html or header.html
hbs.registerPartials(__dirname + '/views/partials');
// install view engine for handlebars into express
app.set('view engine', 'hbs');

// add middleware to express - log some events to console and to file
app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    // print log to console
    console.log(log);
    // write log to the file
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});
// add middleware to express - maintenance page
// app.use((req, res, next) => {
//     // render custom maintenance page
//     res.render('maintenance.hbs', {
//         pageTitle: 'Maintenance Page'
//     });
// });

// add middleware to express - set directory with public access files in it
app.use(express.static(__dirname + '/public'));

// register helper functions for hbs template engine
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    // render custom view
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website'
    });
});

app.get('/about', (req, res) => {
    // render custom view
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/projects', (req, res) => {
    // render custom view
    res.render('projects.hbs', {
        pageTitle: 'Portfolio Page',
        welcomeMessage: 'Portfolio page here...'
    })
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to fulfill this request!'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});