const fs = require('node:fs');
const path = require('node:path');

exports.walk = (dir, callback) => {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    var filepath = path.join(dir, file);
    const stats = fs.statSync(filepath);
    if (stats.isDirectory()) {
      module.exports.walk(filepath, callback);
    } else if (stats.isFile()) {
      callback(filepath, file, stats);
    }
  });
};
