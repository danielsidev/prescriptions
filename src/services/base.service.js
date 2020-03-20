"use strict";
const rp = require('request-promise');
class BaseRequestService{
    constructor(token, host, data, method){
        this.token = token;
        this.host = host;
        this.data = data;
        this.method = method;
        this.options = {};
        this.setOptions();
    }

    setOptions(){
        switch (this.method) {
            case "GET":
                this.options = {
                    uri: `${this.host}/${this.data}`,
                    headers: {'User-Agent': 'Request-Promise'},
                    auth: {'bearer': this.token},
                    json: true 
                };
                break;
            case "POST":
                this.options = {
                    method: 'POST',
                    uri: this.host,
                    encoding: 'utf8',
                    headers: {'User-Agent': 'Request-Promise', 'Content-Type': 'application/json'},
                    auth: {'bearer': this.token},
                    body: this.data,
                    json: true 
                };
                break;    
            default:
                this.options = {
                    uri: `${this.host}/${this.data}`,
                    headers: {'User-Agent': 'Request-Promise'},
                    auth: {'bearer': this.token},
                    json: true 
                };
                break;
        }
    }

    getResponse(){         
        return new Promise((resolve, reject) => {
            rp(this.options).then((res) => {
                resolve(res);
            }).catch((error) => {
                reject(error);
            });
        });
    }
}

module.exports = BaseRequestService;