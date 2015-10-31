var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');//cargamos mongoose
var pelicula = require('../models/pelicula');


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
	    //res.send('Nuevo pelicula agregada: ' + pelicula);
	    res.redirect('/pelicula');
	});
});

router.post('/alquilar', function(req, res, next) {
	if(!req.body.idPelicula) redirect('/pelicula');
	pelicula.count( {  "socioPortador.socioId": req.body.idSocio } , function(err,count){
		if(count>=3) res.redirect('/pelicula?limite_excedido_para_dicho_usuario');
		else{
			pelicula.findById( req.body.idPelicula , function(error,pelicula,count){
				if(error) {
					console.log('Error al alquilar pelicula: ' + error);
					res.send('Error');
				}else{
					console.log('Se alquilará la peli: ' + JSON.stringify(pelicula));
					pelicula.socioPortador = { 
						socioId: req.body.idSocio,
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
		}
});

	
});

router.get('/:id/quitarAlquiler', function(req, res, next) {
	console.log('idPelicula: ' + req.params.id);
	if(!req.params.id) redirect('/pelicula');
	pelicula.findById( req.params.id , function(error,pelicula,count){
		if(error) {
			console.log('Error al alquilar pelicula: ' + error);
			res.send('Error');
		}else{
			console.log('Se alquilará la peli: ' + JSON.stringify(pelicula));
			pelicula.socioPortador = undefined;
			pelicula.save(function(error,documento){
				if(error) {
					console.log('Error al alquilar pelicula: ' + error);
					res.send('/pelicula?sigue_alquilada');
				}else{
					res.send('/pelicula?exito_quitar_alquiler');
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


router.get('/countPrestadas/:id', function(req, res, next) {
	//if(!req.query.idPelicula) redirect('/pelicula');
	pelicula.count( { "socioPortador.socioId": req.params.id } , function(err,count){
		console.log('Del socio ' + req.params.id + ' se contaron ' + count + ' pelis prestadas');
		res.send('Del socio ' + req.params.id + ' se contaron ' + count + ' pelis prestadas');
	});
});

module.exports = router;
