const { DialogController } = require('../controllers/dialog.controller')
class DialogRoute {
    static configure(app) {
        app.use('/dialog', DialogController)
    }
}

module.exports = DialogRoute;