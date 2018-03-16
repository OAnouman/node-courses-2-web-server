const express = require('express');

const hbs = require('hbs');

const fs = require('fs');

const port = process.env.port || 3000;

let app = express();

app.set('view engine', 'hbs');

hbs.registerPartials(`${__dirname}/views/partials`);

app.use((req, res, next) => {

    let now = new Date().toString();

    let event = `${now}: ${req.method} - ${req.url}`;

    fs.appendFile('server.log', event + '\n',
        err => {
            if (err)
                console.log('Unable to write log to file')
        });

    next();

});

// app.use((req, res, next) => {

//     res.render('maintenance.hbs');

// })

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());

hbs.registerHelper('capitalize', str => str.toUpperCase());

app.get('/', (req, res) => {

    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to Express home page !'
    });

});

app.get('/about', (req, res) => {

    res.render('about.hbs', {
        pageTitle: 'About Page',
    });

});

app.get('/bad', (req, res) => res.send({ errorMessage: 'Unable to fulfill your request' }));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});