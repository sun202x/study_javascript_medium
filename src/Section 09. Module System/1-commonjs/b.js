console.log('b.js');

// exports 키워드를 통해 함수를 내보낸다.
exports.sayHello = function (name) {
    console.log(`hello~ ${name}`);
};