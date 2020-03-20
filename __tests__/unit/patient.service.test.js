require('dotenv').config();
let PatientService = require('../../src/services/patients.service');
describe('Patient Services', () => {

    it('should patient return that exists', async () => {
        let id = 1;        
            let patient = new PatientService(process.env.TOKEN_PATIENT, process.env.HOST_PATIENT, id, "GET");
            let response  = await patient.getResponse();
            console.log(`response: ${JSON.stringify(response)}`);
            expect(response.data.id).toBe(id);     
    });
    it('should patient returns that does not exists', async () => {
        let id = 10;        
        let response = null;
            let patient = new PatientService(process.env.TOKEN_PATIENT, process.env.HOST_PATIENT, id, "GET");
            try {
                response  = await patient.getResponse();    
            } catch (error) {
                response = error.statusCode
            }
            expect(response).toBe(404);     
    });
    it('should return a malformed url error for patient', async () => {
        let id = null;        
        let response = null;
            let patient = new PatientService(process.env.TOKEN_PATIENT, process.env.HOST_PATIENT, id, "GET");
            try {
                response  = await patient.getResponse();    
            } catch (error) {
                response = error.statusCode
            }
            expect(response).toBe(400);     
    });
 });