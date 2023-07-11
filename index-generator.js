const fs = require('fs');
const path = require('path');
const mime = require('mime-types');

function createIndex(baseDir, indexPath) {
  const indexFile = fs.createWriteStream(indexPath);

  function traverseDirectory(directory) {
    const files = fs.readdirSync(directory);

    files.forEach((file) => {
      const filePath = path.join(directory, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        traverseDirectory(filePath);
      } else {
        const size = stat.size;
        const contentType = mime.lookup(filePath);

        indexFile.write(`File Name: ${file}\n`);
        indexFile.write(`Size: ${size} bytes\n`);
        indexFile.write(`Content Type: ${contentType}\n`);
        indexFile.write(`Path: ${filePath}\n`);
        indexFile.write('-'.repeat(50) + '\n');
      }
    });
  }

  traverseDirectory(baseDir);
  indexFile.end();
  console.log('Index file created successfully.');
}

const baseDirectory = '/Users/tehila/Desktop/MJ/Predict/takehome';
const indexFilePath = '/Users/tehila/Desktop/MJ/Predict/takehome/index.txt';

createIndex(baseDirectory, indexFilePath);
