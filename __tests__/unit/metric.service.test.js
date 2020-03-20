require('dotenv').config();
let MetricService = require('../../src/services/metric.service');
describe('Metric Services', () => {

    it('should to register metric data complete', async () => {
        let data = {
            "clinic_id": 1,
            "clinic_name": "Clínica A",
            "physician_id": 1,
            "physician_name": "José",
            "physician_crm": "SP293893",
            "patient_id": 1,
            "patient_name": "Rodrigo",
            "patient_email": "rodrigo@gmail.com",
            "patient_phone": "(16)998765625"
          };        
    let metric = new MetricService(process.env.TOKEN_METRIC, process.env.HOST_METRIC, data, "POST");
            let response  = await metric.getResponse();
            expect(response.clinic_id).toBe(data.clinic_id);     
            expect(response.clinic_name).toBe(data.clinic_name);     
            expect(response.physician_id).toBe(data.physician_id);     
            expect(response.physician_name).toBe(data.physician_name);     
            expect(response.physician_crm).toBe(data.physician_crm);     
            expect(response.patient_id).toBe(data.patient_id);  
            expect(response.patient_name).toBe(data.patient_name);     
            expect(response.patient_email).toBe(data.patient_email);  
            expect(response.patient_phone).toBe(data.patient_phone);     
    });
    it('should to register metric data less clinic name', async () => {
        let data = {
            "clinic_id": 1,
            "clinic_name": "",
            "physician_id": 1,
            "physician_name": "José",
            "physician_crm": "SP293893",
            "patient_id": 1,
            "patient_name": "Rodrigo",
            "patient_email": "rodrigo@gmail.com",
            "patient_phone": "(16)998765625"
          };                
    let metric = new MetricService(process.env.TOKEN_METRIC, process.env.HOST_METRIC, data, "POST");
    let response  = await metric.getResponse();
    expect(response.clinic_id).toBe(data.clinic_id);     
    expect(response.clinic_name).toBe(data.clinic_name);     
    expect(response.physician_id).toBe(data.physician_id);     
    expect(response.physician_name).toBe(data.physician_name);     
    expect(response.physician_crm).toBe(data.physician_crm);     
    expect(response.patient_id).toBe(data.patient_id);  
    expect(response.patient_name).toBe(data.patient_name);     
    expect(response.patient_email).toBe(data.patient_email);  
    expect(response.patient_phone).toBe(data.patient_phone);  
    });
    it('should does not register metric because the malformed url exists', async () => {
    let data = null;        
    let response = null;
    let metric = new MetricService(process.env.TOKEN_METRIC, process.env.HOST_METRIC, data, "POST");
            response  = await metric.getResponse(); 
            expect(response.errorCode).toBe("4000");     
    });
 });