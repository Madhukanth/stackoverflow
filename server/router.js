const SearchController = require('./controllers/searchController');
const AnswerController = require('./controllers/answerController');

module.exports = (app) => {
  app.post('/', SearchController.searchController);
  app.post('/answer', AnswerController.answerController);
};
