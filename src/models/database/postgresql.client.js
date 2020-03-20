const {Client, Pool}  = require('pg');

class PostgreSqlClient{
        constructor(){

            this.config = null;
            this.client = null;
            this.setConfig();
        }
        setConfig(){
            this.config = {
                user: process.env.DB_USER,
                host: process.env.DB_HOST,
                database: process.env.DB_NAME,
                password: process.env.DB_PASSWORD,
                port: process.env.DB_PORT,
                max: 20,
                idleTimeoutMillis: 30000,
                connectionTimeoutMillis: 2000,
              };
        }

        getClient(){
           return new Promise((resolve, reject)=>{
                this.client = new Client(this.config);
                this.client.connect()
                .then(() => {
                    resolve(this.client);    
                })
                .catch((err) => {
                    this.client.end();
                    reject('Database connection error!!!');
                });    
            });

        }

        async getPool(){
            let pool = null;
            try {
                pool = new Pool(this.config);
                this.client =  await pool.connect();
                return this.client;                
            } catch (error) {
                this.client.end();
                return error;
            }
         }
}

module.exports = PostgreSqlClient;