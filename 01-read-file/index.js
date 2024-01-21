let fs = require('fs');
let path = require('path');

let text = path.join(__dirname, 'text.txt');

let file = new fs.createReadStream(text, { encoding: 'utf-8' });

file.on('readable', function () {
  let chang = file.read();
  console.log(chang);
});
