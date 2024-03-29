let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');

const userRoute = require('./Routes/user.route');
const adminRoute = require('./Routes/admin.route');
const customerRoute = require('./Routes/customer.route');
const employeeRoute = require('./Routes/employee.route');
const serviceRoute = require('./Routes/service.route');
const tireRoute = require('./Routes/tire.route');
const vehicleRoute = require('./Routes/vehicle.route');
const oilRoute = require('./Routes/oil.route');
const receiptRoute = require('./Routes/receipt.route');
const reportRoute = require('./Routes/report.route')
const roleRoute = require('./Routes/role.route');
const permissionRoute = require('./Routes/permission.route');
const teamRoute = require('./Routes/team.route');
const tabRoute = require('./Routes/tab.route');

mongoose.connect('mongodb+srv://inventory:inventory123@inventorycluster.ai2teve.mongodb.net/db_inventory?retryWrites=true&w=majority').then(data => {
    console.log(`Conneced to Mongodb! Database name: ${data.connections[0].name}`);
}).catch(err => {
    console.log(`Error connecting to database. ${err}`);
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true,
}));
app.use(cors());
app.use('/admins', adminRoute);
app.use('/users', userRoute);
app.use('/customers', customerRoute);
app.use('/employees', employeeRoute);
app.use('/services', serviceRoute);
app.use('/tires', tireRoute);
app.use('/vehicles', vehicleRoute);
app.use('/oils', oilRoute);
app.use('/receipts', receiptRoute);
app.use('/reports', reportRoute);
app.use('/roles', roleRoute);
app.use('/permissions', permissionRoute);
app.use('/teams', teamRoute);
app.use('/tabs', tabRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App Running at port: ${port}`);
});