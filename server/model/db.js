var mongoose = require('mongoose');

var dbURI;

//This is set by the backend tests
if (typeof global.TEST_DATABASE != "undefined") {
    dbURI = global.TEST_DATABASE;
}
else {
    dbURI = 'mongodb://localhost/Sem3CA5Final';
}

mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function (err) {
    global.mongo_error = "Not Connected to the Database";
    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});

process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through app termination');
        process.exit(0);
    });
});

var usersSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    email: {type: String, unique: true},
    role: String,
    authid: String,
    created: { type: Date, default: new Date() }
});

var originSchema = new mongoose.Schema({
    title: String
});

var classSchema = new mongoose.Schema({
    title: String
});

var unitSchema = new mongoose.Schema({
    title: String
});

var productSchema = new mongoose.Schema({
    origin: Number,
    price: Number,
    title: String,
    class: Number,
    unit: Number,
    date: Date,
    imageLink: String,
    startDate: Date,
    endDate: Date
});


mongoose.model('User', usersSchema, "users");
mongoose.model('Origin', originSchema, "origins");
mongoose.model('Class', classSchema, "classes");
mongoose.model('Unit', unitSchema, "units");
mongoose.model('Product', productSchema, "products");
