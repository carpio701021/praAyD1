var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var pelicula = new Schema({
	titulo: String,
	año: Number,
	director: String,
	actores: String,
	lenguajeOrigen: String,
	lenguajeDisponible: String,
	generoCinematografico: String,
	duracion: Number,
	socioPortador: {
		socioId: mongoose.Schema.Types.ObjectId,
		fechaAlquiler: Date
	} //validar este 
});

module.exports = mongoose.model('pelicula', pelicula);
