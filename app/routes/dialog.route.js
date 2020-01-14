const { DialogController } = require('../controllers/dialog.controller')
class DialogRoute {
    static configure(app) {
        app.use('/action', DialogController)
    }
}

module.exports = DialogRoute;