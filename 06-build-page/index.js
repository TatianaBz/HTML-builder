let fs = require('fs');
const path = require('path');

let dir = path.join(__dirname);
fs.mkdir(
  'project-dist',
  {
    recursive: true,
  },
  (err) => {
    if (err) throw err;
    fs.writeFile('project-dist/index.html', '', (err) => {
      if (err) throw err;

      fs.readFile(dir + '/' + 'template.html', 'utf8', (err, data) => {
        if (!err) {
          fs.readdir(dir + '/' + 'components', (err, files) => {
            if (err) throw err;

            let projectIndex = path.join(__dirname, 'project-dist/index.html');
            let template = path.join(__dirname, 'template.html');
            let components = path.join(__dirname, 'components');

            for (let file of files) {
              let dir1 = file.slice(file.indexOf('.') + 1);
              if (dir1 === 'html') {
                fs.readFile(components + '/' + file, 'utf8', (err, text) => {
                  if (!err) {
                    data = data.replace('{{' + file.slice(0, -5) + '}}', text);

                    fs.writeFile(projectIndex, data, (err) => {
                      if (err) throw err;
                    });
                  }
                });
              }
            }
          });
        }
      });

      /*-------------*/

      fs.writeFile('project-dist/style.css', '', function (err) {
        if (err) {
          console.log(err);
        }

        let projectStyle = path.join(__dirname, 'project-dist/style.css');
        let styles = path.join(__dirname, 'styles');

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

                      fs.appendFile(projectStyle, data, (err) => {
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

      /*-------------------*/
      fs.mkdir(
        'project-dist/assets',
        {
          recursive: true,
        },
        (err) => {
          if (err) throw err;

          let text = path.join(__dirname, 'assets');
          let textCopy = path.join(__dirname, 'project-dist/assets');
          copyFils(text, textCopy);

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
                        );
                      },
                    );
                  }
                });
              }
            });
          }
        },
      );
      /*-------------- */
    });
  },
);
