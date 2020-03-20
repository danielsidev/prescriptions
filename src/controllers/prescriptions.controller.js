const config = require('config');
const prescriptionError = config.get('error.prescription');
let PrescriptionsDao = require('../models/dao/prescriptions.dao');
let PatientController = require('./patient.controller');
let ClinicController = require('./clinic.controller');
let PhysicianController = require('./physician.controller');
let MetricController = require('./metric.controller');
class PrescriptionsController{
constructor(){
    this.prescription = [];
    this.patient = null;
    this.clinic = null;
    this.physician = null;
    this.logMount = "mountPrescription: ";
    this.logPre = "prePrescription: ";
    this.metric = {
        "clinic_id": null,
        "clinic_name": "",
        "physician_id": null,
        "physician_name": "",
        "physician_crm": "",
        "patient_id": null,
        "patient_name": "",
        "patient_email": "",
        "patient_phone": ""  
    };
}
    verifyPrescription(data){
        let check = false;
        if(!!data && !!data.clinic && !!data.physician && !!data.patient && !!data.text && data.text.length>0){
            check = true;
        }
        return check;
    }

    async mountPrescription(data){        
        if(this.verifyPrescription(data)){
            try {
                let pat = new PatientController();
                this.patient = await pat.getPatientById(data.patient);  
            } catch (error) {
                throw error.message; 
            }
            try {
            let cli = new ClinicController();
            this.clinic = await cli.getClinicById(data.clinic);
            } catch (error) {
                throw error.message; 
            }
      
            try {
                let phy = new PhysicianController();
                this.physician = await phy.getPhysicianById(data.physician);
            } catch (error) {
                throw error.message; 
            }
      
        }else{
            throw new Error(prescriptionError.data_invalid); 
        }        
    }
    async mountPrescriptionFlex(data){        
        if(this.verifyPrescription(data)){
            try {
                let pat = new PatientController();
                this.patient = await pat.getPatientById(data.patient);  
            } catch (error) {
                throw error.message; 
            }
            this.clinic = {"data": {"id": data.clinic,"name": ""}};      
            try {
                let phy = new PhysicianController();
                this.physician = await phy.getPhysicianById(data.physician);
            } catch (error) {
                throw error.message; 
            }
      
        }else{
            throw new Error(prescriptionError.data_invalid); 
        }        
    }
    async setMetric(){
        try {
            this.metric = {
                "clinic_id": this.clinic.data.id,
                "clinic_name": this.clinic.data.name,
                "physician_id": this.physician.data.id,
                "physician_name": this.physician.data.fullName,
                "physician_crm": this.physician.data.crm,
                "patient_id": this.patient.data.id,
                "patient_name": this.patient.data.fullName,
                "patient_email": this.patient.data.email,
                "patient_phone": this.patient.data.phone  
            };
        } catch (error) {
            throw error.message; 
        }
    }
    async prePrescription(data){    
        try {
            await this.mountPrescription(data);
            await this.setMetric();            
            let met = new MetricController();
            await met.registerMetric(this.metric);
        } catch(error) {
            throw error; 
        }
    }
    async prePrescriptionFlex(data){    
        try {
            await this.mountPrescriptionFlex(data);
            await this.setMetric();            
            let met = new MetricController();
            await met.registerMetric(this.metric);
        } catch(error) {
            throw error; 
        }
    }
    async createPrescription(data){        
         try {
                await this.prePrescription(data);
                this.prescription.push(data.clinic);
                this.prescription.push(data.physician);
                this.prescription.push(data.patient);
                this.prescription.push(data.text);
                let pres = new PrescriptionsDao();
                let res = await pres.setPrescription(this.prescription);
                let response = {
                    "data":{
                        "id":res.rows[0].id_prescription,
                        "clinic":{"id":res.rows[0].id_clinic},
                        "physician":{"id":res.rows[0].id_physician},
                        "patient":{"id":res.rows[0].id_patient},
                        "text":res.rows[0].prescription
                    }
                }; 
                return response; 
         } catch (error) {
            throw error; 
         }

    }

    async createPrescriptionFlex(data){        
        try {
               await this.prePrescriptionFlex(data);
               this.prescription.push(data.clinic);
               this.prescription.push(data.physician);
               this.prescription.push(data.patient);
               this.prescription.push(data.text);
               let pres = new PrescriptionsDao();
               let res = await pres.setPrescription(this.prescription);
               let response = {
                "data":{
                    "id":res.rows[0].id_prescription,
                    "clinic":{"id":res.rows[0].id_clinic},
                    "physician":{"id":res.rows[0].id_physician},
                    "patient":{"id":res.rows[0].id_patient},
                    "text":res.rows[0].prescription
                }
               }; 
               return response; 
        } catch (error) {
           throw error; 
        }

   }
}

module.exports = PrescriptionsController;