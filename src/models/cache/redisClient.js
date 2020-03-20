const errorlog = require('../../util/logger').errorlog;
const redis    = require("redis"); 
class RedisClient{
    constructor(hours = 0){
        this.client = redis.createClient();    
        this.client.on('connect', () => {console.log('Redis client connected');});
        this.client.on("error", (error) => { errorlog("Redis client",error);});
        this.timeout = (60*60*hours); //1 day
    }
    async setCache(key, value){
        return new Promise((resolve, reject)=>{
            this.client.set(key, value,'EX',this.timeout, (err)=>{
                if(err){
                    errorlog("setCache",err);
                    reject(err);
                }else{
                    resolve('cache_created');
                }
            });
        });
    }
    async getCache(key){
        return new Promise((resolve, reject) =>{
            this.client.get(key, (err, reply)=>{
                if(err){
                    errorlog("getCache",err);
                    reject(err);
                }else{
                    resolve(reply);
                }
            });
        });    
    }
    async deleteCache(key){
        return new Promise((resolve, reject) =>{
            this.client.del(key, (err, res)=>{
                if(err){
                    errorlog("deleteCache",err);
                    reject(err);
                }else{
                    resolve(res);
                }
            });
        });
    }
    closeRedis(){
        this.client.quit();    
    }
}
module.exports = RedisClient;



 

