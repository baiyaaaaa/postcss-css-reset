'use strict';

var fs = require('fs');
var path = require('path');
var resetion = {
  'table': {
    'border-collapse': 'collapse',
    'border-spacing': '0',
    'vertical-align': 'middle'
  },
  'table-cell': {
    'text-align': 'left',
    'font-weight': 'normal',
    'vertical-align': 'middle',
    'margin': '0',
    'padding': '0'
  },
  'list': {
    'list-style': 'none',
    'margin': '0',
    'padding': '0'
  },
  'font': {
    'font-family': 'inherit',
    'font-size': 'inherit',
    'font-weight': 'inherit'
  },
  'boxModel': {
    'margin': '0',
    'padding': '0',
    'width': 'auto',
    'height': 'auto'
  }
};

export default {
  resetGlobal(platefprm) {
    return new Promise((resolve, reject) => {
      var inputPath = path.resolve(__dirname, `../src/styles/reset.${platefprm}.css`);

      fs.readFile(inputPath, 'utf8', function (err, file) {
        if(err) {
          reject(err);
        } else {
          resolve(file);
        }
      });
    });
  },
  resetNested(tags) {
    return new Promise((resolve, reject) => {
      let result = {};

      tags.forEach((tag) => {
        Object.keys(resetion[tag]).forEach((prop) => {
          result[prop] = resetion[tag][prop];
        });
      });
      resolve(result);
    });
  }
};
