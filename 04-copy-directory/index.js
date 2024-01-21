let fs = require('fs');
let path = require('path');

let dir = path.join(__dirname);

fs.mkdir(
  dir + '/' + 'files-copy',
  {
    recursive: true,
  },
  (err) => {
    if (err) throw err;

    let text = path.join(__dirname, 'files');
    let textCopy = path.join(__dirname, 'files-copy');

    deleteFils(textCopy);
    copyFils(text, textCopy);

    function deleteFils(folderName) {
      fs.readdir(folderName, (err, files) => {
        if (err) throw err;
        for (let file of files) {
          fs.stat(folderName + '/' + file, (err, stats) => {
            if (err) throw err;
            if (!stats.isDirectory()) {
              fs.unlink(folderName + '/' + file, (err) => {
                if (err) throw err;
                console.log(file);
              });
            } else {
              deleteFils(folderName + '/' + file, (err) => {
                if (err) throw err;
              });
            }
          });
        }
      });
    }

    function copyFils(folderName, folderNewName) {
      fs.readdir(folderName, (err, files) => {
        if (err) throw err;
        for (let file of files) {
          fs.stat(folderName + '/' + file, (err, stats) => {
            if (err) throw err;

            if (!stats.isDirectory()) {
              fs.copyFile(
                folderName + '/' + file,
                folderNewName + '/' + file,
                (err) => {
                  if (err) throw err;
                },
              );
            } else {
              fs.mkdir(
                textCopy + '/' + file,
                {
                  recursive: true,
                },
                (err) => {
                  if (err) throw err;

                  copyFils(
                    folderName + '/' + file,
                    folderNewName + '/' + file,
                    (err) => {
                      if (err) throw err;
                    },
                  );
                  console.log(textCopy + '/' + file);
                },
              );
            }
          });
        }
      });
    }
  },
);
