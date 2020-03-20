const config = require('config');
const metricError = config.get('error.metric');
const requestError = config.get('error.request');
const MetricService = require('../services/metric.service');
class MetricController{
 
    async registerMetric(data){
        try {
            let metric = new MetricService(process.env.TOKEN_METRIC, process.env.HOST_METRIC, data, "POST");
            let response = await metric.getResponse();
            if(response.errorCode=="4000"){
                throw new Error(400); 
            }else{
                return response;            
            }            
        } catch (err) {  
            if(err.message == 400){
                throw new Error(JSON.stringify(requestError.bad)); 
            }else{
                throw new Error(JSON.stringify(metricError.service));    
            }             
        }
    }
}
module.exports = MetricController;