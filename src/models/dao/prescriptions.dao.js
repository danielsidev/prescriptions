const config = require('config');
const prescriptionError = config.get('error.prescription');
const PostgreSqlClient = require('../database/postgresql.client');
class PrescriptionsDao extends PostgreSqlClient{
    constructor(){
        super();
        this.table = `prescriptions`;
        this.fields = `id_clinic, id_physician, id_patient, prescription`;
        this.queryFields = ``;
        this.queryValues = [];
        this.client = null;
    }

    getTable(){
        return this.table;
    }

    getFields(){
        return this.fields;
    }


    async deletePrescription(id){
        try {
            this.client = await this.getPool();
            await this.client.query('BEGIN');
            this.queryFields = `delete  from ${this.getTable()} where id_prescription=$1;`;
            this.queryValues =[id];
            await this.client.query(this.queryFields, this.queryValues );
            await this.client.query('COMMIT');
        } catch (error) {
            console.log(`We can not get prescriptions :: error : ${error}`);
            throw new Error(`We can not get prescriptions :: error : ${error}`);
        }
    }
    async setPrescription(prescription){
        try {             
            this.queryFields = `insert into ${this.table}(${this.fields}) values($1, $2, $3, $4) returning id_prescription, id_clinic, id_physician, id_patient, prescription`;
            this.queryValues = prescription;
            this.client = await this.getPool();
            await this.client.query('BEGIN');
           let res =  await this.client.query(this.queryFields, this.queryValues );
            await this.client.query('COMMIT');
            console.log(prescriptionError.success_register);
            return res;
        } catch (error) {
            await this.client.query('ROLLBACK');
            console.log(`Set Prescription ERROR: ${error}`);
            throw new Error(prescriptionError.fail_register);
        } finally {
           this.client.release();
        }
    }
}

module.exports = PrescriptionsDao;