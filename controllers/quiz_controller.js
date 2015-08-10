var model = require('../models/models.js');

// GET quizes/index
exports.load = function(req, res, next, quizId) {
  model.Quiz.find({
                  where: {id: Number(quizId)},
                  include: [{model: models.Comment}]
                  }).then(
    function(quiz){
      if(quiz){
        req.quiz = quiz;
        next();
      } else { next(new Error('No Existe quizId=' + quizId));}
    }
  ).catch(function(error) {next(error);});
 
};

// GET quizes/index
exports.index = function(req, res) {
	var query = req.query;
	if(query.search !=null){
		var busqueda = query.search.replace(" ","%");
		model.Quiz.findAll({where: ["pregunta like ?", '%'+busqueda+'%']}).then(function(quizes) {
			res.render('quizes/index.ejs', {quizes: quizes, errors: []});
		}).catch(function(error) {next(error);})
	}else{
		model.Quiz.findAll().then(function(quizes) {
			res.render('quizes/index.ejs', {quizes: quizes, errors: [] });
		}).catch(function(error) {next(error);})
	}
};

// GET quizes/show
exports.show = function(req, res) {
  model.Quiz.find(req.params.quizId).then(function(quiz){
    res.render('quizes/show', { quiz: req.quiz, errors: []});
  })
};

// GET quizes/answer
exports.answer = function(req, res) {
  model.Quiz.find(req.params.quizId).then(function(quiz){
    if(req.query.respuesta === req.quiz.respuesta){
      res.render('quizes/answer', { quiz: req.quiz, respuesta: 'Correcto', errors: [] });
    } else {
      res.render('quizes/answer', {quiz: req.quiz, respuesta: 'Incorrecto', errors: [] });
    }  
  })
};

// GET quizes/quizes
exports.question = function(req, res) {
  model.Quiz.findAll({where: ["pregunta like ?", search]}).success(function(quiz){
    res.render('quizes/search', { });
    if(req.query.respuesta === quiz[0].respuesta){
      res.render('quizes/answer', { respuesta: 'Correcto' });
    } else {
      res.render('quizes/answer', { respuesta: 'Incorrecto' });
    }
  })
};


// GET quizes/new
exports.new = function(req, res) {
	var quiz = model.Quiz.build(
		{pregunta: "Pregunta", respuesta: "Respuesta", tema: "Tema"}
	);
	res.render('quizes/new', { quiz: quiz , errors: []});		
};

// GET quizes/create
exports.create = function(req, res) {
  var quiz = model.Quiz.build(req.body.quiz);
  console.log("quiz.pregunta[" + quiz.pregunta+  "]   quiz.respuesta[" + quiz.respuesta + "]   quiz.tema[" +quiz.tema+"]"); 
// quiz
//  .validate()
//  .then(
//    function(err){
//      if(err){
//        res.redirect('/quizes/new', {quiz: quiz, errors: err.errors});
//      } else {
      	//guarda en DB los campos pregunta y respuesta de quiz
      	quiz.save({fields: ["pregunta", "respuesta", "tema"]}).then(function(){
      		res.redirect('/quizes');
      	}) //Redireccion HTTP (URL Relativo) lista de preguntas    
//      }
//    }
//  );
};

// GET quizes/edit
exports.edit = function(req, res) {
  var quiz = req.quiz;
  res.render('quizes/edit', { quiz: quiz, errors: []  }); 
};

// GET quizes/update
exports.update = function(req, res) {
  req.quiz.pregunta = req.body.quiz.pregunta;
  req.quiz.respuesta = req.body.quiz.respuesta;
  req.quiz.tema = req.body.quiz.tema;

  console.log("req.quiz.pregunta[" + req.quiz.pregunta+  "]   req.quiz.respuesta[" + req.quiz.respuesta + "]   req.quiz.tema[" +req.quiz.tema+"]");
//  req.quiz.validate()
//    .then(
//      function(err){
//        if(err){
//          res.redirect('/quizes/edit', {quiz: req.quiz, errors: err.errors});
//        } else {
          req.quiz
        	//guarda en DB los campos pregunta y respuesta de quiz
        	.save({fields: ["pregunta", "respuesta", "tema"]}).then(function(){
        		res.redirect('/quizes');
        	}) //Redireccion HTTP (URL Relativo) lista de preguntas    
//        }
//      }
//    );
};

// GET quizes/edit
exports.destroy = function(req, res) {
  req.quiz.destroy().then(function(){
    res.redirect('/quizes');
  }).catch(function(error) {next(error);}); 
};