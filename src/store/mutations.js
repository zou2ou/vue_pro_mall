import {
  ADD_COUNT,
  ADD_TO_CART
} from './mutation-types'
export default {
  // mutations 唯一的目的就是修改state中的状态
  // mutations 中的每个方法尽可能完成的时间比较单一
  // 添加商品数量
  [ADD_COUNT] (state, oldProduct) {
    oldProduct.count++
  },
  // 添加商品
  [ADD_TO_CART] (state, payload) {
    state.cartList.push(payload)
  }
}
