'use strict';

var util = require('util');
var log = require('log-utils');
var BasePrompt = require('enquirer-prompt');

/**
 * "Input" prompt
 */

function Prompt(/*question, rl, answers*/) {
  return BasePrompt.apply(this, arguments);
}

/**
 * Inherit BasePrompt
 */

util.inherits(Prompt, BasePrompt);

/**
 * Start the prompt session
 * @param  {Function} `cb` Callback when prompt is finished
 * @return {Object} Returns the `Prompt` instance
 */

Prompt.prototype.ask = function(cb) {
  this.callback = cb.bind(this);
  var self = this;

  this.ui.on('keypress', this.render.bind(this, null));
  this.ui.once('line', this.onSubmit.bind(this));
  this.once('error', this.onError.bind(this));

  // Init
  this.render();
  return this;
};

/**
 * Render the prompt to terminal
 */

Prompt.prototype.render = function(error) {
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

Prompt.prototype.onSubmit = function(e) {
  this.answer = this.filterInput(e);
  this.status = 'answered';
  this.render();
  this.ui.write();
  this.callback(this.answer);
};

Prompt.prototype.onError = function(answer) {
  this.render(answer.isValid);
};

Prompt.prototype.filterInput = function(input) {
  return input || this.question.default || '';
};

/**
 * Module exports
 */

module.exports = Prompt;
