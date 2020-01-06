/* global __basedir */

module.exports = server => {
    return (req, res) => {
        const talk = async () => {
            res.send('ddd')
        }
        talk();
    }
}