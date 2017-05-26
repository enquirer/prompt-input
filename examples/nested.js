var Prompt = require('..');
var prompt = new Prompt({
  name: 'first',
  message: 'What is your name?',
  validate: function(str) {
    if (!str || !/^[a-z]+$/i.test(str)) {
      return 'invalid value';
    }
    return true;
  }
});

prompt.ask(function(answer) {
  console.log(answer);

  prompt.run()
    .then(function(answer) {
      console.log(answer);
    });
});
