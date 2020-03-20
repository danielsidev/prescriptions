require('dotenv').config();
let ClinicService = require('../../src/services/clinic.service');
describe('Clinic Services', () => {

    it('should clinic return that exists', async () => {
        let id = 1;        
        let clinic = new ClinicService(process.env.TOKEN_CLINIC, process.env.HOST_CLINIC, id, "GET");
            let response  = await clinic.getResponse();
            expect(response.data.id).toBe(id);     
    });
    it('should physician returns that does not exists', async () => {
        let id = 10;        
        let response = null;
        let clinic = new ClinicService(process.env.TOKEN_CLINIC, process.env.HOST_CLINIC, id, "GET");
            try {
                response  = await clinic.getResponse();    
            } catch (error) {
                response = error.statusCode
            }
            expect(response).toBe(404);     
    });
    it('should return a malformed url error for physician', async () => {
        let id = null;        
        let response = null;
        let clinic = new ClinicService(process.env.TOKEN_CLINIC, process.env.HOST_CLINIC, id, "GET");
            try {
                response  = await clinic.getResponse();    
            } catch (error) {
                response = error.statusCode
            }
            expect(response).toBe(400);     
    });
 });