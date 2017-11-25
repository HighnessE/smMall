/**
 * Created by wolfsheller on 2017/4/6.
 */
// 写法一
function doSomething() {
  console.log('doSomething')
}
function doSomethingElse() {
  console.log('doSomethingElse')
}
function finalHandler (parameter) {
  console.log(parameter)
}
console.log('111111111111')
new Promise(doSomething).then(function () {
  return doSomethingElse();
}).then(finalHandler());
console.log('222222222222')
// 写法二
new Promise(doSomething).then(function () {
  doSomethingElse();
}).then(finalHandler());
console.log('333333333333')
// 写法三
new Promise(doSomething).then(doSomethingElse()).then(finalHandler());
console.log('44444444444')
// 写法四
new Promise(doSomething).then(doSomethingElse).then(finalHandler());
