"use strict";
const BaseRequestService = require('./base.service');
class PhysicianService extends BaseRequestService{

    constructor(token, host, data, method){
        super(token, host, data, method);
    }
}
module.exports = PhysicianService;



