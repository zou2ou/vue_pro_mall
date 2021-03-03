import {
  ADD_COUNT,
  ADD_TO_CART
} from './mutation-types'
export default {
  addCart (context, payload) {
    // let oldProduct = ''
    // 新添加的商品 判断是否为同一件商品
    // state.cartList.forEach(item => {
    //   if(item.iid === payload.iid) {
    //     oldProduct = item
    //   }
    // })
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
    // 2. 判断oldProduct
    if(oldProduct) {
      // oldProduct.count += 1
      context.commit(ADD_COUNT, oldProduct)
    } else {
      payload.count = 1
      // state.cartList.push(payload)
      context.commit(ADD_TO_CART, payload)
    }
  }
}
