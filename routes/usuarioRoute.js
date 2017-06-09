var express = require('express');
var Usuario = require('../model/usuario');
var router = express.Router();

router.get('/autenticar', function(req, res) {
  res.render('default/autenticar', {title:'Autenticar'});
});

router.get('/registrar', function(req, res) {
  res.render('default/registrar', {title:'registrar'});
});

router.get('/salir', function(req, res) {
  res.render('default/registrar', {title:'registrar'});
});


router.post('/autenticar', function(req, res) {
  var data = {
    nick: req.body.nick,
    contrasena: req.body.contrasena
  }


  Usuario.autenticar(data, function(err, resultado) {
    if(typeof resultado !== undefined) {

      res.cookie('nick', resultado[0].nick);
      res.cookie("idUsuario", resultado[0].idUsuario);
      
      console.log("Se guardo la cookie");

      res.redirect("/");
    } else {
      res.json({"Mensaje": "No existe usuario"});
    }
  });
});


router.post('/registrar', function(req, res) {
  var data = {
    //idUsuario : null,
    nick: req.body.nick,
    contrasena: req.body.contrasena
  }

  Usuario.insert(data, function(err, resultado) {
    if(resultado && resultado.insertId > 0) {
      res.cookie('nick', resultado[0].nick);
      res.cookie("idUsuario", resultado[0].idUsuario);
      
      res.redirect("/");
    } else {
      res.json({"Mensaje": "No se ingreso la Usuario"});
    }
  });
});

router.get('/api/usuario/', function(req, res) {
  Usuario.selectAll(function(error, resultados){
    if(typeof resultados !== undefined) {
      res.json(resultados);
    } else {
      res.json({"Mensaje": "No hay Usuarios"});
    }
  });
});

router.get('/api/usuario/:idUsuario',
  function(req, res) {
    var idUsuario = req.params.idUsuario;
    Usuario.select(idUsuario,
      function(error, resultados){
      if(typeof resultados !== undefined) {
        res.json(resultados);
      } else {
        res.json({"Mensaje": "No hay Usuarios"});
      }
  });
});

router.post('/api/usuario', function(req, res) {
  var data = {
    idUsuario : null,
    nick: req.body.nick,
    contrasena: req.body.contrasena
  }
  Usuario.insert(data, function(err, resultado) {
    if(resultado && resultado.insertId > 0) {
      res.redirect('/api/Usuario');
    } else {
      res.json({"Mensaje": "No se ingreso la Usuario"});
    }
  });
});

router.put('/api/Usuario/:idUsuario', function(req, res) {
  var idUsuario = req.params.idUsuario;
  var data = {
    idUsuario : req.body.idUsuario,
    nick: req.body.nick,
    contrasena: req.body.contrasena
  }

  if(idUsuario === data.idUsuario) {
    Usuario.update(data, function(err, resultado) {
      if(resultado !== undefined) {
        res.json(resultado);
      } else {
        res.json({"Mensaje": "No se modifico la Usuario"});
      }
    });
  } else {
    res.json({"Mensaje": "No concuerdan los datos"});
  }
});

router.delete('/api/Usuario/:idUsuario',
  function(req, res) {
    var idUsuario = req.params.idUsuario;
    Usuario.delete(idUsuario,
      function(error, resultado){
      if(resultado && resultado.Mensaje === "Eliminado") {
        res.redirect("/api/Usuario");
      } else {
        res.json({"Mensaje": "No se puede eliminar"});
      }
  });
});


module.exports = router;
