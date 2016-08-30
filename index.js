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
 * Start the prompt session
 * @param  {Function} `cb` Callback when prompt is finished
 * @return {Object} Returns the `Input` instance
 */

Input.prototype.ask = function(callback) {
  this.callback = callback.bind(this);
  this.ui.on('keypress', this.render.bind(this, null));
  this.ui.once('line', this.onSubmit.bind(this));
  this.once('error', this.onError.bind(this));
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
 * When the answer is submitted (user presses `enter` key), re-render
 * and pass answer to callback.
 * @param {Object} `input`
 */

Input.prototype.onSubmit = function(input) {
  this.answer = this.question.getAnswer(input);
  this.status = 'answered';
  this.submitAnswer();
};

/**
 * Handle error events
 * @param {Object} `event`
 */

Input.prototype.onError = function(event) {
  this.render(event.isValid);
};

/**
 * Module exports
 */

module.exports = Input;
