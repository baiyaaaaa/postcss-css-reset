'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _resetCore = require('./resetCore');

var _resetCore2 = _interopRequireDefault(_resetCore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var atRules = {
  'reset-global': function resetGlobal(platefprm) {
    return _resetCore2.default.resetGlobal(platefprm);
  },
  'reset-nested': function resetNested() {
    for (var _len = arguments.length, tags = Array(_len), _key = 0; _key < _len; _key++) {
      tags[_key] = arguments[_key];
    }

    return _resetCore2.default.resetNested(tags);
  }
};

// const unwrapAmp = (nodeSelector, node) => {
//   if (nodeSelector.indexOf('&:') >= 0 && node.name !== 'media') {
//     return node.selectors.map((selector) => {
//       return nodeSelector.replace(/&/g, selector);
//     }).join(',');
//   }
//   return nodeSelector;
// };

// const getGlobalSelector = (node) => {
//   if (node.parent && node.parent.type === 'atrule') {
//     return `${node.parent.name} ${node.parent.params} ${node.selector}`;
//   } else if (node.name === 'media') {
//     return getGlobalSelector(node.parent);
//   }
//   return node.selector;
// };

var applyRuleSetToNode = function applyRuleSetToNode(ruleSet, node, currentAtRule) {
  Object.keys(ruleSet).forEach(function (prop) {
    var rule = ruleSet[prop];
    if ((typeof rule === 'undefined' ? 'undefined' : _typeof(rule)) === 'object') {
      if (node.name !== 'media') {
        var extRule = _postcss2.default.rule({ selector: unwrapAmp(prop, node) });
        applyRuleSetToNode(rule, extRule);

        var globalSelector = getGlobalSelector(node);
        node.parent.insertAfter(ampInsertedNodes[globalSelector] || node, extRule);
        ampInsertedNodes[globalSelector] = extRule;
      } else {
        var mediaNestedRule = _postcss2.default.parse(prop + ' ' + JSON.stringify(rule).replace(/"/g, ''));
        node.append(mediaNestedRule);
      }
    } else {
      if (currentAtRule) {
        node.insertBefore(currentAtRule, { prop: prop, value: rule });
      } else {
        node.append({ prop: prop, value: rule });
      }
    }
  });
};

module.exports = _postcss2.default.plugin('postcss-reset', function (opts) {
  var options = _extends({}, opts);

  return function (root) {
    return new Promise(function (resolve, reject) {
      root.walkAtRules(/^reset-/i, function (rule) {
        var parser = atRules[rule.name];

        if (parser) {
          var params = rule.params.trim() ? rule.params.trim().split(' ') : [];

          parser.apply(undefined, _toConsumableArray(params)).then(function (resetRules) {
            if ((typeof resetRules === 'undefined' ? 'undefined' : _typeof(resetRules)) === 'object') {
              applyRuleSetToNode(resetRules, rule.parent, rule);
            } else {
              root.prepend(resetRules);
            }
            resolve();
            rule.remove();
          });
        }
      });
    });
  };
});