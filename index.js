'use strict';

var util = require('util');
var log = require('log-utils');
var Prompt = require('prompt-base');

/**
 * Create a new "Input" prompt with the given `question`, and optional `answers`
 * and `rl`.
 */

function Input(/*question, answers, rl*/) {
  Prompt.apply(this, arguments);
}

/**
 * Inherit base `Prompt`
 */

util.inherits(Input, Prompt);

/**
 * Render the prompt to terminal
 */

Input.prototype.render = function(state) {
  state = state || {};
  var append = state.isValid === false ? log.red('>> ') + state.error : '';
  var message = this.message;
  if (this.status === 'answered') {
    message += log.cyan(this.answer);
  } else {
    message += this.rl.line;
  }
  this.ui.render(message, append);
};

/**
 * Module exports
 */

module.exports = Input;
