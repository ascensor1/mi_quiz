var models = require('../models/models.js');


// Autoload - factoriza el código si ruta incluye :quizId
exports.load = function(req, res, next, quizId) {
  models.Quiz.find(quizId).then(
    function(quiz) {
      if (quiz) {
        req.quiz = quiz;
        next();
      } else { next(new Error('No existe quizId=' + quizId)); }
    }
  ).catch(function(error) { next(error);});
};



// // GET /quizes/question
// exports.question = function(req, res) {
// // 	res.render('quizes/question', {pregunta: 'Capital de Italia',title: 'Pregunta'});
// 	models.Quiz.findAll().then(function(quiz) {
// 		res.render('quizes/question', { pregunta: quiz[0].pregunta});
// 	})
// };


// GET /quizes
exports.index = function(req, res) {
// 	models.Quiz.findAll().then(function(quizes) {
// 		res.render('quizes/index.ejs', { quizes: quizes});
// 	})
	
  models.Quiz.findAll().then(
    function(quizes) {
      res.render('quizes/index', { quizes: quizes});
    }
  ).catch(function(error) { next(error);})

};

// GET /quizes/answer
// exports.answer = function(req, res) {
// 	if (req.query.respuesta === 'Roma'){
// 		res.render('quizes/answer', {respuesta: 'Correcto',title: 'Respuesta'});
// 	} else {
// 		res.render('quizes/answer', {respuesta: 'Incorrecto. La respuesta era "Roma"',title: 'Respuesta'});
// 	}

// GET /quizes/:id
exports.show = function(req, res) {
//   models.Quiz.find(req.params.quizId).then(function(quiz) {
//     res.render('quizes/show', { quiz: quiz});
//   })
  res.render('quizes/show', { quiz: req.quiz});
};


// GET /quizes/:id/answer
 exports.answer = function(req, res) {
//   models.Quiz.find(req.params.quizId).then(function(quiz) {
//     if (req.query.respuesta === quiz.respuesta) {
//       res.render('quizes/answer', 
//                  { quiz: quiz, respuesta: 'Correcto' });
//      } else {
//       res.render('quizes/answer', 
//                  { quiz: quiz, respuesta: 'Incorrecto'});
//      }
//    })
  var resultado = 'Incorrecto';
  if (req.query.respuesta === req.quiz.respuesta) {
    resultado = 'Correcto';
  }
  res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
 };

// GET /author
exports.author = function(req, res) {
	res.render("author", {});
};

