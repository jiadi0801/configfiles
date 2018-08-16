// const ms = require.context('./modules/', true, /.*\.js$/)

// ms.keys().map(key => {
//   let m = ms(key)
//   console.log(m.count)
//   m.counter()
//   console.log(m.count)
//   console.log('---------')
// })

function getMs() {
  return import(/* webpackChunkName: "m1" */ './modules/m1').then(m1 => {
    return m1
  })
}

function clickBtn() {
  getMs().then(m1 => {
    console.log('loaded', m1.count)
  })
}

window.clickBtn = clickBtn
