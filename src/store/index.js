import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
// 1. 安装插件
Vue.use(Vuex)

const  state = {
  cartList: []
}
// 2. 创建Store 对象
const store = new Vuex.Store({
  state,
  mutations,
  actions
})

// 挂载Vue 实例上
export default store
