const PostgreSqlClient = require('./postgresql.client');
class InitDb extends PostgreSqlClient{
    constructor(){
        super();
        this.client = null;
        this.main();
    }
    async main(){
        await this.createTablePrescriptions();
        this.finished();       
    }
    async createTablePrescriptions(){
        try {
            this.client = await this.getPool();
            this.queryFields = `  create table prescriptions(
                id_prescription serial primary key not null,
              id_clinic integer null,
              id_physician integer not null,
              id_patient integer not null,
              prescription text not null
            );`;
            await this.client.query(this.queryFields);
            console.log(`Create Table Prescriptions wiht Success!`);
        } catch (error) {
            this.client.release();
            console.log(`We can not create table Prescriptions :: error : ${error}`);
            throw new Error(`We can not create table Prescriptions :: error : ${error}`);
        } finally{
            this.client.release();
        }
    }
    finished(){
        process.exit();
    }
}
new InitDb();