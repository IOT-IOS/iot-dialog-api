module.exports = server => {
    server.use(server.middlewares.bodyParser);

    require('./dialog')(server);
}
