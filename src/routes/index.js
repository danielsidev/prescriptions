const errorlog = require('../util/logger').errorlog;
const config = require('config');
const requestError = config.get('error.request');
let PrescriptionsMiddleware = require('../middlewares/prescriptions.middleware');
class RegisterRoutes {
    constructor(app) { 
        this.app = app;
    }
    setRoutes() {
        this.app.use(function(err, req, res, next) {
            errorlog("ERROR 500",err);
            res.status(500).json(requestError.internal);
          });
        this.app.get('/',(req,res) => res.render('index.html'));
        this.app.post( "/prescriptions",PrescriptionsMiddleware.registerPrescription);
    }
}
module.exports = RegisterRoutes;
