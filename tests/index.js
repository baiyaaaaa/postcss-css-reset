'use strict';

const cssReset = require('../lib/index.js');
const discardComment = require('postcss-discard-comments');
const postcss = require('postcss');
const fs = require('fs');
const path = require('path');
const tape = require('tape');

const features = ['reset-nested', 'reset-mobile', 'reset-pc'];

features.forEach((name) => {
  let featurePath = path.join('tests', 'features');
  let inputCSS = fs.readFileSync(path.join(featurePath, name + '.css'), 'utf8');

  tape(name, (t) => {
    postcss([cssReset, discardComment]).process(inputCSS).then((result) => {
      let actualCSS = result.css;
      let expectedCSS = fs.readFileSync(path.join(featurePath, name + '.expected.css'), 'utf8');

      fs.writeFileSync(path.join(featurePath, name + '.actual.css'), actualCSS);

      t.equal(actualCSS, expectedCSS);
      t.end();
    }).catch((err) => {
      console.error(err);
    });
  });
  
});

