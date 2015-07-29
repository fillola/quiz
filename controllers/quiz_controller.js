var model = require('../models/models.js');

// GET quizes/question
exports.question = function(req, res) {
  model.Quiz.findAll().success(function(quiz){
    res.render('quizes/question', { pregunta: quiz[0].pregunta});  
  })  
};

// GET quizes/show
exports.show = function(req, res) {
  model.Quiz.find(req.params.quizId).then(function(quiz){
    res.render('quizes/show', { quiz: quiz });
  })
};

// GET quizes/answer
exports.answer = function(req, res) {
  model.Quiz.find(req.params.quizId).then(function(quiz){
    if(req.query.respuesta === quiz.respuesta){
      res.render('quizes/answer', { quiz: quiz, respuesta: 'Correcto' });
    } else {
      res.render('quizes/answer', {quiz: quiz, respuesta: 'Incorrecto' });
    }  
  })
  
};

// GET quizes/answer
exports.answer = function(req, res) {
  model.Quiz.findAll().success(function(quiz){
    if(req.query.respuesta === quiz[0].respuesta){
      res.render('quizes/answer', { respuesta: 'Correcto' });
    } else {
      res.render('quizes/answer', { respuesta: 'Incorrecto' });
    }
  }) 
};

// GET quizes/index
exports.index = function(req, res) {
  model.Quiz.findAll().then(function(quizes){
    res.render('quizes/index.ejs', { quizes: quizes });
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