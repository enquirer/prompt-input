
var Prompt = require('./');
var prompt = new Prompt({
  name: 'first',
  message: 'What is your name?'
});

prompt.ask(function(answers) {
  console.log(answers);
});

prompt.run()
  .then(function(answers) {
    console.log(answers);
  });
