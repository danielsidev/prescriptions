require('dotenv').config();
let App =  require('./services/app.service');
let app = new App();
    app.run();
