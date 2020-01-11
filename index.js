const express = require('express');
const bodyParser = require('body-parser');
const app = express().use(bodyParser.json());
const cors = require('cors');
//global variable
const dotenv = require('dotenv');
dotenv.config();
//routing
const { dialogRoute } = require('./app/routes')
//mqttService
const mqttService = require('./app/services/mqtt.service')
//port
const ports = process.env.PORT || 3000;


async function startServer() {
    app.use(cors());
    dialogRoute.configure(app);
    //Titi78/feeds/dialog-feeds.interact/json
    mqttService.init();

    app.use((req, res) => {
        res.status(404);
        if (req.accepts('json')) {
            res.send({ error: `Route ${req.url} doesn't exist` });
            return;
        }
    });

    app.listen(ports);
    console.log(`Server is running on port ${ports}`);
}
startServer();