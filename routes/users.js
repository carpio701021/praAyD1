var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

	var db = req.db;
	var collection = db.get('userlist');
	collection.find({},{},function(e,docs){
			res.json(docs);
	});

	//res.render('index', { title: 'Express' });
	//db.praAyD1.insert({'username' : 'test1','email' : 'test1@test.com','fullname' : 'Bob Smith','age' : 27,'location' : 'San Francisco','gender' : 'Male'})

});

module.exports = router;
