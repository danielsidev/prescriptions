const config = require('config');
const prescriptionError = config.get('error.prescription');
let errorlog       = require('../util/logger').errorlog;
let successlog     = require('../util/logger').successlog;
let PrescriptionController = require('../controllers/prescriptions.controller');
class PrescriptionMiddleware{

    static async registerPrescription(req, res, next){
        let prescription =  new PrescriptionController();
        let data = req.body;
        try {
            let prescriptions =  await prescription.createPrescription(data);
            successlog("registerPrescription ",prescriptionError.success_register);
            res.status(200).json({success:true, message:prescriptionError.success_register,response:prescriptions}); 
        } catch (error) {
            errorlog("registerPrescription",error);
            let err = JSON.parse(error);
            if(err.code=="07"){
                let prescriptions =  await prescription.createPrescriptionFlex(data)
                successlog("registerPrescription ",prescriptionError.success_register);
                res.status(200).json({success:true, message:prescriptionError.success_register,response:prescriptions}); 
            }else{
                res.status(400).json({success:false, error:{code:err.code, message:err.message}, response:prescriptionError.fail_register});   
            }
            
        }    
    }
}

module.exports = PrescriptionMiddleware;