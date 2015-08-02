var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

router.param('quizId', quizController.load);  //autoload :quizId


router.get('/author', function(req, res) {
  res.render('author', { autor: 'Jose Luis Fillola Lorenzo' });
});

router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

router.get('/quizes/question', quizController.question);
router.get('/quizes/search', quizController.search);

module.exports = router;