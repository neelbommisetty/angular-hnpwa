import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { ngExpressEngine } from '@nguniversal/express-engine';
import { enableProdMode } from '@angular/core';

import * as express from 'express';
import { join } from 'path';
import { readFileSync } from 'fs';
const compression = require('compression');
// const api = require('./api');
const spdy = require('spdy');
// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

app.use(compression());
const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');

// Our index.html we'll use as our template
const template = readFileSync(
  join(DIST_FOLDER, 'browser', 'index.html')
).toString();

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {
  AppServerModuleNgFactory,
  LAZY_MODULE_MAP
} = require('./dist/server/main.bundle');

const {
  provideModuleMap
} = require('@nguniversal/module-map-ngfactory-loader');

app.engine(
  'html',
  ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [provideModuleMap(LAZY_MODULE_MAP)]
  })
);

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

// // api server
// app.use('/api', api);

// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));

// All other routes use the Universal engine
app.get('*', (req, res) => {
  res.render(join(DIST_FOLDER, 'browser', 'index.html'), { req });
});

const options = {
  key: readFileSync('./server.key'),
  cert: readFileSync('./server.crt')
};
// Start up the Node server
spdy.createServer(options, app).listen(4000, error => {
  if (error) {
    console.error(error);
    return process.exit(1);
  } else {
    console.log('Listening on port: ' + 4000 + '.');
  }
});
