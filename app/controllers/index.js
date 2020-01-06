module.exports = server => {
    server.controllers = {
        agentIosMusic: require('./agentIosMusic')(server),
    }
}