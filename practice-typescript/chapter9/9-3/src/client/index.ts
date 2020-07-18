import { axiosInstance, apiGet } from './api'
// import { Health } from '../types/api'

// !は Non-null assertion
// document.getElementById('ping')!.addEventListener('click', () => {
//   axiosInstance.get<Health>('/ping').then(({ data }) => {
//     const counter = document.getElementById('count')!
//     counter.innerHTML = `${data.count}`
//   })
// })

document.getElementById('ping')!.addEventListener('click', () => {
  apiGet('/ping').then(({ data }) => {
    const counter = document.getElementById('count')!
    counter.innerHTML = `${data.count}` // var data: { count: number; }
  })
})

// webpack-hot-middlewareのHMRを有効にする
if (module.hot) {
  module.hot.accept()
}