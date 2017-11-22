const fetch = require('node-fetch');
const LRU = require('lru-cache');
const spdy = require('spdy');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const api = express();

let cache = LRU({
  max: 500,
  maxAge: 1000*60*15  // 15 mins
});

api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: false }));


api.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

const BASE_URL = `https://hacker-news.firebaseio.com/v0/`;

api.get('/:type', (req, res) => {
  const pageNumber = req.query.pageNumber ? parseInt(req.query.pageNumber,10) : 0;
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize, 10) : 30;
  const type = req.params.type;
  fetch(`${BASE_URL}${type}.json`)
    .then(ids => {
      return ids.json();
    })
    .then(ids => {
      let requiredIds = ids.slice(
        (pageNumber) * pageSize,
        (pageNumber+1) * pageSize
      );
      convertIdstoStories(requiredIds).then(stories => {
        stories.forEach(story => {
          cache.set(story.id , story);
        });
        res.json(stories);
      });
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

async function convertIdstoStories(ids) {
  let promiseArray = ids.map(id => {
    if (cache.has(id)) {
      return new Promise((resolve) => {
        resolve(cache.get(id));
      });
    }
    return fetch(`${BASE_URL}item/${id}.json`).then(res => res.json());
  });
  return await Promise.all(promiseArray);
}

api.get('/item/:id', (req, res) => {
  const id = req.params.id;
  if (cache.has(id)) {
    res.json(cache.get(id));
  } else {
    fetch(`${BASE_URL}item/${id}.json`)
      .then(story => story.json())
      .then(story => {
        if (story.type === 'poll') {
           convertIdstoStories(story.parts).then(parts => {
             parts.forEach(part => {
               cache.set(part.id, part);
             });
             story.parts = parts;
             res.json(story);
           });
        } else {
          res.json(story);
        }
      }).catch(err => {
        res.status(500).send(err);
      });
  }
});
api.get('*', (req, res) => {
  res.status(200).json({ message: 'ok' });
});

const options = {
  key: fs.readFileSync(__dirname +
  '/../server.key'),
  cert: fs.readFileSync(__dirname + '/../server.crt')
};
// Start up the Node server
spdy.createServer(options, api).listen(3000, error => {
  if (error) {
    console.error(error);
    return process.exit(1);
  } else {
    console.log('Listening on port: ' + 3000 + '.');
  }
});
