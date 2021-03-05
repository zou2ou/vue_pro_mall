import {
  ADD_COUNT,
  ADD_TO_CART
} from './mutation-types'
export default {
  addCart (context, payload) {
   return new Promise(resolve => {
     // let oldProduct = ''
     // 新添加的商品 判断是否为同一件商品
     // state.cartList.forEach(item => {
     //   if(item.iid === payload.iid) {
     //     oldProduct = item
     //   }
     // })
     let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
     // 2. 判断oldProduct
     if(oldProduct) { // 数量加1
       // oldProduct.count += 1
       context.commit(ADD_COUNT, oldProduct)
       resolve ('当前的商品数量+1!')
     } else { // 添加新的商品
       payload.count = 1
       // state.cartList.push(payload)
       context.commit(ADD_TO_CART, payload)
       resolve('添加商品成功!')
     }
   })
  }
}
