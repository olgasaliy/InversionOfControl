// Файл, демонстрирующий то, как фреймворк создает среду (песочницу) для
// исполнения приложения, загружает приложение, передает ему песочницу в
// качестве глобального контекста и получает ссылу на экспортируемый
// приложением интерфейс. Читайте README.md в нем задания.

// Фреймворк может явно зависеть от библиотек через dependency lookup
var fs = require('fs'),
    vm = require('vm'),
    util = require('util'),
    application = require('./application.js');


// Создаем контекст-песочницу, которая станет глобальным контекстом приложения
var context = { module: {},
  console: console,
  setTimeout:setTimeout,
  setInterval:setInterval,
  clearInterval:clearInterval,
  util:util,
  require: function(file){
    var res = require(file);
    var date = new Date();
    var time = date.getDate() + ':' + (date.getMonth()+1) + ':' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    fs.appendFile("requireLog.txt", time + ' ' + file, function(err, info){
      if (err) throw err;
    });
    return res;
  },
  console:{
    log: function(message){
      var date = new Date();
      if(process.argv.length == 3){
        applicationName = path.basename(process.argv[2]);
      }
      else{
        applicationName = "application";
      }
      var time = date.getDate() + ':' + (date.getMonth()+1) + ':' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
      console.log(applicationName + ' ' + time + ': ' + message);
      var consoleOutput = fs.appendFile("output.txt", applicationName + ' ' + time + ': ' + message + '\n', function(err, info){
        if (err) throw err;
      });
    }
  }
};
context.global = context;


//var array;
//var begin = "./", end = ".js";
//process.argv.forEach(function(val, index) {
//
//  if (index>1){
//    var fileName = begin + val + end;
   // console.log(index + " : " + begin);
  var fileName = './application.js';
  var sandbox = vm.createContext(context);
  fs.readFile(fileName, function(err, src) {
      // Тут нужно обработать ошибки

      // Запускаем код приложения в песочнице
      var script = vm.createScript(src, fileName);
      script.runInNewContext(sandbox);
      for (var f in sandbox.module.exports){
        console.log(f, typeof sandbox.module.exports[f]);
      }


      // Забираем ссылку из sandbox.module.exports, можем ее исполнить,
      // сохранить в кеш, вывести на экран исходный код приложения и т.д.
  //  });
  //}
  //console.log(index + " : " + val);

});

// Читаем исходный код приложения из файла

