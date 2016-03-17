// Файл, демонстрирующий то, как фреймворк создает среду (песочницу) для
// исполнения приложения, загружает приложение, передает ему песочницу в
// качестве глобального контекста и получает ссылу на экспортируемый
// приложением интерфейс. Читайте README.md в нем задания.

// Фреймворк может явно зависеть от библиотек через dependency lookup
var fs = require('fs'),
    vm = require('vm'),
    util = require('util');


// Создаем контекст-песочницу, которая станет глобальным контекстом приложения
var context = { module: {},
  console: console,
  setTimeout:setTimeout,
  setInterval:setInterval,
  clearInterval:clearInterval,
  util:util,
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


      // Забираем ссылку из sandbox.module.exports, можем ее исполнить,
      // сохранить в кеш, вывести на экран исходный код приложения и т.д.
  //  });
  //}
  //console.log(index + " : " + val);
});

// Читаем исходный код приложения из файла

