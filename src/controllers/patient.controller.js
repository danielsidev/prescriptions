const config = require('config');
const patientError = config.get('error.patient');
const requestError = config.get('error.request');
const PatientService = require('../services/patients.service');
const CacheController = require('./cache.controller');
class PatientController{
    constructor(){
        this.patient = null;
        this.cache = new CacheController(12);
    }
    async getPatientById(id){
        let key = `patient_id_${id}`;
        try {
            let response = null;
            let patientCache = await this.cache.getCacheObject(key)
            if(!!patientCache){
                response = patientCache;
            }else{
                this.patient = new PatientService(process.env.TOKEN_PATIENT, process.env.HOST_PATIENT, id, "GET");
                response = await this.patient.getResponse();
                if(response.errorCode=="4000"){
                    throw new Error(400); 
                }
                await this.cache.setCacheObject(key, response);
            }
            this.cache.closeRedis();
            return response;                               
        } catch (err) {
            this.cache.closeRedis();
            if(err.statusCode==404){
                throw new Error(JSON.stringify(patientError.not_found)); 
            }else if(err.statusCode==400 || err.message==400){
                throw new Error(JSON.stringify(requestError.bad));      
            }else{
                throw new Error(JSON.stringify(patientError.service)); 
            }            
        }
    }
}

module.exports = PatientController;