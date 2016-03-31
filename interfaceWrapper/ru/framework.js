// Пример оборачивания функции в песочнице

var fs = require('fs'),
    vm = require('vm');


function cloneInterface(anInterface) {
  var clone = {};
  for (var key in anInterface) {
    clone[key] = wrapFunction(key,anInterface[key]);
  }
  return clone;
}

function wrapFunction(fnName, fn) {
  return function wrapper() {
    var args = [];
    Array.prototype.push.apply(args, arguments);
    console.log('Call: ' + fnName);
    console.dir(args);
    if (typeof(args[this.length - 1]) === 'function'){
      statistic['callbacks'] += 1;
      args[args.length - 1] = wrapFunction('callback', args[this.length - 1])
    }
    return fn.apply(undefined, args);
  }
}

// Объявляем хеш из которого сделаем контекст-песочницу
var context = {
  module: {},
  console: console,
  // Оборачиваем функцию setTimeout в песочнице
  fs: cloneInterface(fs),
};

// Преобразовываем хеш в контекст
context.global = context;
var sandbox = vm.createContext(context);

// Читаем исходный код приложения из файла
var fileName = './application.js';
fs.readFile(fileName, function(err, src) {
  // Запускаем код приложения в песочнице
  var script = vm.createScript(src, fileName);
  script.runInNewContext(sandbox);
});
