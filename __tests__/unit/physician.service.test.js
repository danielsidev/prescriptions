require('dotenv').config();
let PhysicianService = require('../../src/services/physician.service');

describe('Physician Services', () => {

    it('should physician return that exists', async () => {
        let id = 1;        
            let physician = new PhysicianService(process.env.TOKEN_PHYSICIAN, process.env.HOST_PHYSICIAN, id, "GET");
            let response  = await physician.getResponse();
            expect(response.data.id).toBe(id);     
    });
    it('should physician returns that does not exists', async () => {
        let id = 10;        
        let response = null;
        let physician = new PhysicianService(process.env.TOKEN_PHYSICIAN, process.env.HOST_PHYSICIAN, id, "GET");
            try {
                response  = await physician.getResponse();    
            } catch (error) {
                response = error.statusCode
            }
            expect(response).toBe(404);     
    });
    it('should return a malformed url error for physician', async () => {
        let id = null;        
        let response = null;
        let physician = new PhysicianService(process.env.TOKEN_PHYSICIAN, process.env.HOST_PHYSICIAN, id, "GET");
            try {
                response  = await physician.getResponse();    
                console.log(JSON.stringify(response));
            } catch (error) {
                response = error.statusCode
            }
            expect(response).toBe(400);     
    });
 });