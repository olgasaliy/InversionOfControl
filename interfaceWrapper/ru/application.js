// Вывод из глобального контекста модуля
//console.log('From application global context');
//
//var fileName = './README.md';
//console.log('Application going to read ' + fileName);
//fs.readFile(fileName, function(err, src) {
//  console.log('File ' + fileName + ' size ' + src.length);
//});

var path = 'tmp';
//fs.mkdir(path, function (err) {
//  if (err) {
//    console.log('failed to create directory', err);
//  }
//});

setInterval(function() {fs.mkdir(path, function (err) {
  if (err) {
    console.log('failed to create directory', err);
  }
});, 1000};