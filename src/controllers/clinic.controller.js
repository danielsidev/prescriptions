const config = require('config');
const clinicError = config.get('error.clinic');
const requestError = config.get('error.request');
const ClinicService = require('../services/clinic.service');
const CacheController = require('./cache.controller');
class ClinicController{
    constructor(){
        this.clinic = null;
        this.cache = new CacheController(72);
    }
    async getClinicById(id){
        try {
            let key = `clinic_id_${id}`;
            let response = null;
            let clinicCache = await this.cache.getCacheObject(key)
                if(!!clinicCache){
                    response = clinicCache;
                }else{
                    this.clinic = new ClinicService(process.env.TOKEN_CLINIC, process.env.HOST_CLINIC, id, "GET");
                    response = await this.clinic.getResponse();
                    if(response.errorCode=="4000"){
                       return 400;
                    } 
                    await this.cache.setCacheObject(key, response);  
                }
                this.cache.closeRedis();
            return response;            
        } catch (err) {
            this.cache.closeRedis();
            if(err.statusCode==404){
                throw new Error(JSON.stringify(clinicError.not_found));
            }else if(err.statusCode==400 || err.message==400){
                throw new Error(JSON.stringify(requestError.bad));      
            }else{
                throw new Error(JSON.stringify(clinicError.service)); 
            }            
        }
    }
}

module.exports = ClinicController;