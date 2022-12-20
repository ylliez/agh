const express = require("express");
let app = express();
const http = require('http')
const portNumber = 4200;
let server = http.createServer(app);

// app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => { res.sendFile(__dirname + `/public/index.html`); });

app.listen(portNumber, function () {
    console.log("Server is running on port " + portNumber);
});