var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var socio = new Schema({
	nombre : String,
	telefono: Number,
	correo: String,
	nacimiento : Date,
	domicilio: String,
	fechaRegistro: Date,
	peliculas: [ { idPelicula : ObjectId } ]
});

module.exports = mongoose.model('socio', socio);
