
require('dotenv').config();
let PrescriptionsController = require('../../src/controllers/prescriptions.controller');
let PrescriptionsDao = require('../../src/models/dao/prescriptions.dao');
 describe('Prescriptions', () => {
    it('should return invalid prescription data', async () => {
        let data= null;        
            let prescriptions = new PrescriptionsController();
            let response  = prescriptions.verifyPrescription(data);            
            expect(response).toBe(false);     
    });
    it('should return valid prescription data', async () => {
        let data= {
            clinic:1,
            physician:1,
            patient:1,
            text:" Text test"
        };        
            let prescriptions = new PrescriptionsController();
            let response  = prescriptions.verifyPrescription(data);            
            expect(response).toBe(true);     
    });
    it('should to create prescription', async () => {
        let data= {
            clinic:1,
            physician:1,
            patient:1,
            text:" Text test"
        };        
            let prescriptions = new PrescriptionsController();
            let response  = prescriptions.createPrescription(data);
            let p = new PrescriptionsDao();
            let id = response.data.id;
            let dataResponse= {
                clinic:response.data.clinic,
                physician:response.data.physician,
                patient:response.data.patient,
                text:response.data.text
            };     
            p.deletePrescription(id);
            expect(dataResponse).toBe(data);     
    });

 })




