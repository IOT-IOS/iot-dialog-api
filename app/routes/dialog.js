const router = require('express').Router();


module.exports = server => {
    router.get('/', server.controllers.agentIosMusic.talk);
    server.use('/dialog', router);
}
