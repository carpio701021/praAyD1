var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');//cargamos mongoose
//var socio = mongoose.model('socio');//obtenemos el modelo curso
var socio = require('../models/socio');


// create a new user
var newUser = socio({
  nombre: 'Peter Quill',
  apellido: 'starlord55',
  nacimiento: Date()
});

// save the user


/* GET home page. */
router.get('/', function(req, res, next) {

	socio.find({}, function(err, socios) {
	  if (err) throw err;

	  // object of all the users
	  console.log(socios);
	});

	res.render('index', { title: 'Socios' });
	//db.praAyD1.insert({'username' : 'test1','email' : 'test1@test.com','fullname' : 'Bob Smith','age' : 27,'location' : 'San Francisco','gender' : 'Male'})

});


router.post('/create', function(req, res, next) {
	new socio({
		nombre : req.body.nombre,
		telefono: req.body.telefono,
		correo: req.body.correo,
		nacimiento : req.body.nacimiento,
		domicilio: req.body.domicilio,
		fechaRegistro: Date
	}).save(function(err, socio, count){
		if(err) throw err;
	    res.send('Nuevo socio agregado: ' + socio);
	});
});

router.get('/getAll', function(req, res, next) {
	socio.find(function( err, socios, count ){
		res.send(socios);
  	});
});

module.exports = router;
