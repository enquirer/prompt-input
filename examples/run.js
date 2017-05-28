var Prompt = require('..');
var prompt = new Prompt({
  name: 'first',
  message: 'What is your name?'
});

prompt.run()
  .then(function(answer) {
    console.log({name: answer});
  });
