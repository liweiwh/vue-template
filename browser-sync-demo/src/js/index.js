console.log('itheima test')


console.log('itheima test')


console.log('itheima test')


console.log('itheima test')



document.getElementById('app').addEventListener('click', function (event) {
  console.log(event.target);
  // ....
})

function mytest (option) {
  option.str = '123123'
  option.add = function (a, b) {
    return a + b
  }
}