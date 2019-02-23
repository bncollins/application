/*const path = require('path');*/
const http = require('http');
const app = require('./app');

const port = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(port);

//Connect Mongoose
//mongoose.connect('mongodb://localhost/login');
//mongoose.Promise = global.Promise;

//Set Static Files
//app.use(express.static(path.join())); 


//app.listen(process.env.port || 5000, ()=> console.log(`Server listening on 5000`));



