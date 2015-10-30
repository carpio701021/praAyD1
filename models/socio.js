var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
 
var socio = new Schema({
    nombre : String,
    apellido : String,
    nacimiento : Date
});

module.exports = mongoose.model('socio', socio);

//mongoose.model('socio', socio);
//mongoose.connect('mongodb://127.0.0.1/praAyD1');

//end of ./db.js*/
