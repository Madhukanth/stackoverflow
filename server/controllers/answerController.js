const cheerio = require('cheerio');
const fetch = require('node-fetch');

exports.answerController = function (req, res) {
  const { title } = req.body;
  const { id } = req.body;
  let id1 = id.match(/\d/g);
  id1 = id1.join('');
  const title2 = title.substring(title.indexOf(':') + 2, title.length - 3);
  const title3 = title2.trimRight('W');
  const title4 = title3.replace(/\s/g, '-');
  const title5 = title4.replace('?', '');
  const url = 'https://stackoverflow.com/questions/' + id1 + '/' + title5;
  console.log(url);
  const answer = [];
  fetch(url)
    .then(res1 =>
      res1.text().then((text) => {
        const $ = cheerio.load(text);
        $('div.answer').each((i, elm) => {
          answer.push({
            ans: $(elm)
              .find('.post-text')
              .html(),
            person: $(elm)
              .find('.user-details')
              .children('a')
              .text(),
            votes: $(elm)
              .find('span.vote-count-post')
              .text()
          });
        });
      }))
    .then(() => res.send({ answer }));
};
