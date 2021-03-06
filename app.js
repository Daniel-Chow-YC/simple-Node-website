const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8080;

// middleware example
const myLogger = function(req, res, next) {
    console.log("Request IP: " + req.ip);
    console.log("Request Method: " + req.method);
    console.log("Request date: " + new Date());  
    next(); // THIS IS IMPORTANT!
  }
  
app.use(myLogger)
  

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/contact-me', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact-me.html'));
});

// redirect
app.get('/contact', (req, res) => {
    res.redirect('/contact-me')
});

// 404 page
app.use((req, res) => {
    res.sendFile(path.join(__dirname, '404.html'))
    res.status(404)
});


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
