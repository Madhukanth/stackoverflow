const cheerio = require('cheerio');
const fetch = require('node-fetch');

exports.searchController = function (req, res) {
  const { search } = req.body;
  const result = [];
  const page = [];
  fetch('https://stackoverflow.com/search?page=1&tab=Relevance&pagesize=50&q=' +
      search)
    .then(res1 =>
      res1.text().then((text) => {
        const $ = cheerio.load(text);
        $('span.page-numbers').each((i, elm) => {
          page.push($(elm).text());
        });
        $('div.question-summary').each((i, elm) => {
          result.push({
            title: $(elm)
              .find('a')
              .text(),
            question: $(elm)
              .find('.excerpt')
              .text(),
            votes: $(elm)
              .find('.vote-count-post')
              .text()
          });
        });

        const reload = page.length - 3;
        // Total number of pages
        console.log(page[reload]);
      }))
    .then(() => console.log(result))
    .then(() => res.send({ result }));
};
