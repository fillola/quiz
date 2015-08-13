var model = require('../models/models.js');

// GET /quizes/:quizId/comments/new
exports.new = function(req, res) {
  res.render('comments/new', { quizid: req.params.quizId, errors: [] });
};

// POST /quizes/:quizId/comments
exports.create = function(req, res) {
  var comment = model.Comment.build(
    { texto: req.body.comment.texto,
      QuizId: req.params.quiz
    });

  comment.validate()
    .then(
      function(err){
        if(err){
          res.render('comments/new', {comment: comment, quizid:  req.params.quizId, errors: err.errors});
        } else {
          comment
        	//guarda en DB los campos pregunta y respuesta de quiz
        	.save().then(function(){
        		res.redirect('/quizes/'+req.params.quizId);
        	}) //Redireccion HTTP (URL Relativo) lista de preguntas    
        }
      }
    ).catch(function(error) {next(error);});
};
