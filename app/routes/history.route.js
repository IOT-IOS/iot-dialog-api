const { HistoryController } = require('../controllers/history.controller')
class HistoryRoute {
    static configure(app) {
        app.use('/history', HistoryController)
    }
}

module.exports = HistoryRoute;