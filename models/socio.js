var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var socio = new Schema({
	nombre : String,
	telefono: Number,
	correo: String,
	nacimiento : Date,
	domicilio: String,
	fechaRegistro: Date
	//peliculas: [ Number ]
});

module.exports = mongoose.model('socio', socio);
