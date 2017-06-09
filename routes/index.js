var express = require('express');
var Autenticacion = require('../helper/autenticacion');
var router = express.Router();
var auth = new Autenticacion();


/* GET home page. */
router.get('/', function(req, res, next) {
	auth.autorizar(req);
  res.render(auth.getPath() + 'index');
});

router.get('/cookie/clear', function(req, res) {

  res.clearCookie('nick');
  res.clearCookie('idUsuario');
  res.end("se eliminaron las Cookies");

});

router.get('/cookie/all', function(req, res){
	res.status(200).send(req.cookies);
});

router.get('/', function(req, res, next) {
  res.render('default/index', { title: 'Express' });
});

router.get('/autenticar', function(req, res) {
  res.render('default/autenticar', {title:'Autenticar'});
});
router.get('/registrar', function(req, res) {
  res.render('default/registrar', {title:'registrar'});
});


module.exports = router;
