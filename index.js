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

Input.prototype.render = function(err) {
  var error = typeof err === 'string'
    ? log.red('>> ') + err
    : '';

  var message = this.message + (this.status === 'answered'
    ? log.cyan(this.answer)
    : this.rl.line);

  this.ui.render(message, error);
};

/**
 * Module exports
 */

module.exports = Input;
