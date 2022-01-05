const express = require('express');
const bodyParser = require('body-parser');
const sensorsRoutes = require('./routes/sensors.routes');

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api/sensors', sensorsRoutes);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});
