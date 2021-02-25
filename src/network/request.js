import axios from 'axios'

// export function request (config, success, failure) {
//   // 1. 创建axios 实例
//   const instance = axios.create({
//     baseURL: 'http://123.207.32.32:8000',
//     timeout: 5000
//   })
//   // 发送真正的网络请求
//   instance(config)
//     .then(res => {
//       // console.log(res)
//       success(res)
//     })
//     .catch(err => {
//       // console.log(err)
//       failure(err)
//     })
// }

// export function request (config) {
//   // 1. 创建axios 实例
//   const instance = axios.create({
//     baseURL: 'http://123.207.32.32:8000',
//     timeout: 5000
//   })
//   // 发送真正的网络请求
//   instance(config.baseConfig)
//     .then(res => {
//       // console.log(res)
//       config.success(res)
//     })
//     .catch(err => {
//       // console.log(err)
//       config.failure(err)
//     })
// }

export function request (config) {
  // return new Promise((resolve, reject) => {
  // 1. 创建axios 实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  })

  // 2. axios 的拦截器
  // 拦截请求
  instance.interceptors.request.use(config => {
    // console.log(config)
    // 请求拦截的作用
    // 1. 比如config 中的一些信息不符合服务器的要求

    // 2. 比如每次发送网络请求时, 都希望在界面中显示一个请求的图标

    // 3. 某些网络请求(比如登录(token)) 必须携带一些特殊的信息

    // 已经被拦截了  需要返回config
    return config
  }, err => {
    console.log(err)
  })

  // 拦截响应
  instance.interceptors.response.use(ret => {
    // console.log(ret)
    return ret.data
  }, err => {
    console.log(err)
  })

  // 3. 发送真正的网络请求
  // instance(config)
  //   .then(res => {
  //     resolve(res)
  //   })
  //   .catch(err => {
  //     reject(err)
  //   })
  return instance(config)// 函数本身返回Promise
  // })
}
