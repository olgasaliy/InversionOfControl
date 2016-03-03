// Файл содержит маленький кусочек основного модуля демонстрационного
// прикладного приложения, загружаемого в песочницу демонстрационным
// кусочком фреймворка. Читайте README.md в нем задания.

// Вывод из глобального контекста модуля
console.log('From application global context');



module.exports = function() {
  // Вывод из контекста экспортируемой функции
  console.log('From application exported function');
};


setTimeout(function() {
  console.log('Check');
}, 1000);



var timerId =setInterval(function() {
 // clearInterval(10000);
  console.log('Check2');
}, 1000);

setTimeout(function() {
  console.log('Stop');
  clearInterval(timerId);
}, 10000);
