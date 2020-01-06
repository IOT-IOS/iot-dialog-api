const express = require('express');
const server = express();
const cors = require('cors');

const ports = process.env.PORT || 3003;
global.__basedir = __dirname;

async function startServer() {
    server.use(cors());

    require('./app/controllers')(server);
    require('./app/middlewares')(server);
    require('./app/routes')(server);

    server.use((req, res) => {
        res.status(404);
        if (req.accepts('json')) {
            res.send({ error: `Route ${req.url} doesn't exist` });
            return;
        }
    });

    server.listen(ports);
    console.log(`Server is running on port ${ports}`);
}
startServer();