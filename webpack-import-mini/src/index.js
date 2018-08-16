// const ms = require.context('./modules/', true, /.*\.js$/)

// ms.keys().map(key => {
//   let m = ms(key)
//   console.log(m.count)
//   m.counter()
//   console.log(m.count)
//   console.log('---------')
// })

// 可以采用变量的形式动态import，但是记得限定import的目录，不然会弹出警告
// 限定了目录的将会把所有匹配的模块名都输出
function getMs() {
  const varpath = 'm2'
  return import(/* webpackChunkName: "m1" */ './modules/' + varpath).then(m1 => {
    return m1
  })
}

// 幸运的是，webpack能合并m1到一个文件中， 那么如果在多处import m1，也不会出现多个m1副本
function getMs1() {
  return import(/* webpackChunkName: "m1" */ './modules/m1').then(m1 => {
    return m1
  })
}


function clickBtn() {
  getMs().then(m1 => {
    console.log('loaded', m1.count)
  })
  getMs1().then(m1 => {
    console.log('loaded ms1', m1.count)
  })
}

window.clickBtn = clickBtn
