'use strict';

var Prompt = require('prompt-base');
var cyan = require('ansi-cyan');
var red = require('ansi-red');

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

Prompt.extend(Input);

/**
 * Render the prompt to terminal
 */

Input.prototype.render = function(state) {
  var error = typeof state === 'string' ? red('>> ') + state : '';
  var message = this.renderMessage(this);

  if (this.status === 'answered') {
    message += cyan(this.answer);
  } else {
    message += this.renderHelp(this) + this.rl.line;
  }

  this.ui.render(message, error);
};

/**
 * Module exports
 */

module.exports = Input;
