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
	pelicula.find(function( err, peliculas, count ){
			//res.send(peliculas);
			res.render('pelicula', { peliculas: peliculas });
  	});
});


router.get('/formularioNuevaPelicula', function(req, res, next) {
	res.render('nuevaPelicula');
});

router.get('/formularioAlquilarPelicula/:id', function(req, res, next) {
	pelicula.find({_id : req.params.id },function(error,pelicula,count){
		if(error) res.send('Error');
		console.log('Se encontro la peli: ' + JSON.stringify(pelicula));
		res.render('alquilarPelicula', { pelicula : pelicula[0] });
	});
});


router.delete('/:id', function(req, res, next) {
	pelicula.remove({_id: req.params.id}, function(error){
		if(error){
			res.send('Error al intentar eliminar la pelicula.');
		}else{ 
			res.send('Película eliminada exitosamente');
		}
	});
	
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

router.get('/alquilar', function(req, res, next) {
	console.log('idPelicula: ' + req.query.idPelicula);
	if(!req.query.idPelicula) redirect('/pelicula');
	pelicula.findById( req.query.idPelicula , function(error,pelicula,count){
		if(error) {
			console.log('Error al alquilar pelicula: ' + error);
			res.send('Error');
		}else{
			console.log('Se alquilará la peli: ' + JSON.stringify(pelicula));
			pelicula.socioPortador = { 
				socioId: req.query.idSocio,
				fechaAlquiler: new Date()
			};
			pelicula.save(function(error,documento){
				if(error) {
					console.log('Error al alquilar pelicula: ' + error);
					res.redirect('/pelicula?no_alquilada');
				}else{
					res.redirect('/pelicula?exito');
				}
			});
		}	
	});
});

router.get('/getAll', function(req, res, next) {
	pelicula.find(function( err, peliculas, count ){
		res.send(peliculas);
  	});
});

module.exports = router;
