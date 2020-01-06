module.exports = server => {
    return {
        talk: require('./talk')(server),
    };
};
