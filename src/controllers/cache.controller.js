const RedisClient = require('../models/cache/redisClient');
class CacheController extends RedisClient{
constructor(hours){
    super(hours);
}
    async getSimpleCache(key){
        try {
            if(!!key){
                let cache = await this.getCache(key);    
                if(!!cache){
                    return cache;
                }else{
                    return false;
                }        
            }else{
                throw new Error('getSimpleCache: key is invalid');
            }
        } catch (error) {
            throw error.message;
        }
    }
    async getCacheObject(key){
        let cache  = null;
        try {
            if(!!key){
                cache = await this.getCache(key);    
                if(cache){
                    cache = JSON.parse(cache);
                }else{
                    cache = false;
                }
            }else{
                throw new Error('getCacheObject: key is invalid');
            }
            return cache;
        } catch (error) {
            throw error.message;
        }  
    }
    async setCacheObject(key, value){
        try {
            if(!!value && !!key){
                let obj = JSON.stringify(value);
                await this.setCache(key , obj);
            }else{
                throw new Error('setCacheObject: key or value are invalid');
            }        
        } catch (error) {
            throw error.message;        
        }
    }
    async setSimpleCache(key, value){
        try {
            if(!!value && !!key){
                await this.setCache(key , value);
            }else{
                throw new Error('setSimpleCache: key or value are invalid');
            }        
        } catch (error) {
            throw error.message;        
        }
    }
    async deleteCacheKey(key){
        try {
            if(!!key){
                await this.deleteCache(key);
            }else{
                throw new Error('setSimpleCache: key or value are invalid');
            }            
        } catch (error) {
            throw error.message; 
        }
    }
}

module.exports = CacheController;