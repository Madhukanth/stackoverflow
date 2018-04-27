const SearchController = require('./controllers/searchController');

module.exports = (app) => {
  app.post('/', SearchController.searchController);
};
