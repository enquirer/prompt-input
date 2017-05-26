'use strict';

require('mocha');
var assert = require('assert');
var Prompt = require('./');

describe('enquirer-prompt-input', function() {
  it('should export a function', function() {
    assert.equal(typeof Prompt, 'function');
  });

  it('should throw an error when no args are passed', function() {
    assert.throws(function() {
      Prompt();
    });
  });

  it('should throw an error when invalid args are passed', function() {
    assert.throws(function() {
      Prompt({});
    });

    assert.throws(function() {
      Prompt(null);
    });
  });

  it('should return an answers object on run', function(cb) {
    var prompt = new Prompt({
      name: 'color',
      message: 'What is your favorite color?',
    });

    var unmute = prompt.mute();

    prompt.on('ask', function() {
      prompt.rl.emit('line', 'blue');
    });

    prompt.run()
      .then(function(answer) {
        assert.deepEqual(answer, 'blue');
        unmute();
        cb();
      })
  });

  it('should return an answers object on ask', function(cb) {
    var prompt = new Prompt({
      name: 'color',
      message: 'What is your favorite color?',
    });

    var unmute = prompt.mute();

    prompt.on('ask', function() {
      prompt.rl.emit('line', 'blue');
    });

    prompt.ask(function(answer) {
      assert.deepEqual(answer, 'blue');
      unmute();
      cb();
    });
  });
});
