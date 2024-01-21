let fs = require('fs');
const process = require('process');
let path = require('path');

let folder = path.join(__dirname);

let newfile = fs.createWriteStream(folder + '/' + 'newtext.txt', {
  encoding: 'utf-8',
});

process.stdout.write('Hello\n');

process.on('SIGINT', function () {
  process.exit();
});
process.stdin.on('data', function (out) {
  let ex = out.toString().toLowerCase();
  if (ex.trim() === 'exit') {
    process.exit();
  } else {
    newfile.write(out);
  }
});
process.on('exit', function () {
  process.stdout.write('Bye!\n');
});
newfile.on('error', function (error) {
  if (error) {
    console.log('ошибка записи файла');
  }
  process.exit();
});
/*
newfile.on('error', function (error) {
  console.log(error.message);
  process.exit();
});
*/
