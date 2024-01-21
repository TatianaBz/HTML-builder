let fs = require('fs');
const path = require('path');

let text = path.join(__dirname, 'project-dist');
let styles = path.join(__dirname, 'styles');

fs.writeFile(text + '/' + 'bundle.css', '', function (err) {
  if (err) {
    console.log(err);
  }

  getFiles(styles);

  function getFiles(folderName) {
    fs.readdir(folderName, (err, files) => {
      if (err) throw err;
      for (let file of files) {
        fs.stat(folderName + '/' + file, (err, stats) => {
          if (err) throw err;

          if (!stats.isDirectory()) {
            let dir = file.slice(file.indexOf('.') + 1);
            if (dir === 'css') {
              fs.readFile(folderName + '/' + file, (err, data) => {
                if (err) throw err;

                fs.appendFile(text + '/' + 'bundle.css', data, (err) => {
                  if (err) throw err;
                });
              });
            }
          } else {
            getFiles(folderName + '/' + file);
          }
        });
      }
    });
  }
});
