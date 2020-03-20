process.env.SUPPRESS_NO_CONFIG_WARNING = 'y';
const config = require('config');
const physicianError = config.get('error.physician');
const requestError = config.get('error.request');
const PhysicianService = require('../services/physician.service');
const CacheController = require('./cache.controller');
class PhysicianController{
    constructor(){
        this.physician = null;
        this.cache = new CacheController(48);
    }
    async getPhysicianById(id){
        let key = `physician_id_${id}`;
        try {
            let response = null;
            let physicianCache = await this.cache.getCacheObject(key)
            if(!!physicianCache){
                response = physicianCache;
                }else{
                    this.physician = new PhysicianService(process.env.TOKEN_PHYSICIAN, process.env.HOST_PHYSICIAN, id, "GET");
                        response = await this.physician.getResponse();
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
                throw new Error(JSON.stringify(physicianError.not_found)); 
            }else if(err.statusCode==400 || err.message==400){
                throw new Error(JSON.stringify(requestError.bad));      
            }else{
                throw new Error(JSON.stringify(physicianError.service)); 
            }            
        }
    }
}
module.exports = PhysicianController;