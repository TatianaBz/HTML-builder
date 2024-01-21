let fs = require('fs');
let path = require('path');

let text = path.join(__dirname, 'secret-folder');
getFiles(text);

function getFiles(folderName) {
  fs.readdir(folderName, (err, files) => {
    if (err) throw err;
    for (let file of files) {
      fs.stat(folderName + '/' + file, (err, stats) => {
        if (err) throw err;

        if (!stats.isDirectory()) {
          let dir = file.indexOf('.');

          console.log(
            file.slice(0, dir) +
              '-' +
              file.slice(dir + 1) +
              '-' +
              stats.size / 1000 +
              'kb',
          );
        }
      });
    }
  });
}
