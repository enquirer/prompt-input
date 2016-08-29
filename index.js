'use strict';

var util = require('util');
var log = require('log-utils');
var Prompt = require('enquirer-prompt');

/**
 * "Input" prompt
 */

function Input(/*question, answers, rl*/) {
  return Prompt.apply(this, arguments);
}

/**
 * Inherit Prompt
 */

util.inherits(Input, Prompt);

/**
 * Start the prompt session
 * @param  {Function} `cb` Callback when prompt is finished
 * @return {Object} Returns the `Input` instance
 */

Input.prototype.ask = function(cb) {
  this.callback = cb.bind(this);
  var self = this;

  // this.ui.on('keypress', this.render.bind(this, null));
  this.ui.once('line', this.onSubmit.bind(this));
  this.once('error', this.onError.bind(this));

  // Init
  this.render();
  return this;
};

/**
 * Render the prompt to terminal
 */

Input.prototype.render = function(error) {
  var append = error ? log.red('>> ') + error : '';
  var message = this.message;
  if (this.status === 'answered') {
    message += log.cyan(this.answer);
  } else {
    message += this.rl.line;
  }
  this.ui.render(message, append);
};

/**
 * When user press `enter` key
 */

Input.prototype.onSubmit = function(e) {
  this.answer = this.filterInput(e);
  this.status = 'answered';
  this.render();
  this.ui.write();
  this.callback(this.answer);
};

Input.prototype.onError = function(answer) {
  this.render(answer.isValid);
};

Input.prototype.filterInput = function(input) {
  return input || this.question.default || '';
};

/**
 * Module exports
 */

module.exports = Input;
