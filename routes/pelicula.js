var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');//cargamos mongoose
var pelicula = require('../models/pelicula');


// create a new user
/*var newUser = pelicula({
  nombre: 'Peter Quill',
  apellido: 'starlord55',
  nacimiento: Date()
});

// save the user */


/* GET home page. */
router.get('/', function(req, res, next) {

	pelicula.find({}, function(err, peliculas) {
	  if (err) throw err;
	  console.log(peliculas);
	});

	res.render('pelicula', { title: 'Socios' });
	//db.praAyD1.insert({'username' : 'test1','email' : 'test1@test.com','fullname' : 'Bob Smith','age' : 27,'location' : 'San Francisco','gender' : 'Male'})
});


router.post('/create', function(req, res, next) {
	new pelicula({
		titulo: req.body.titulo,
		año: req.body.anio,
		director: req.body.director,
		actores: req.body.actores,
		lenguajeOrigen: req.body.lenguaje,
		lenguajeDisponible: req.body.lenguajeDisponible,
		generoCinematografico: req.body.genero,
		duracion: req.body.duracion,
	}).save(function(err, pelicula, count){
		if(err) {
			console.log('Error BD: \n' + err)
			throw err
		};
	    res.send('Nuevo pelicula agregada: ' + pelicula);
	});
});

router.get('/getAll', function(req, res, next) {
	pelicula.find(function( err, peliculas, count ){
		res.send(peliculas);
  	});
});

module.exports = router;
