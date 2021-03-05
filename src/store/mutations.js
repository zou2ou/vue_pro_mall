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
    payload.checked = false
    state.cartList.push(payload)
    localStorage.setItem('cartList', JSON.stringify(state.cartList))
  },
  changeCheck (state, payload) {
    payload.checked = !payload.checked
  },
  deleteGoodsItem (state, id) {
    state.cartList.forEach((item,index) => {
      if(item.iid == id) {
        state.cartList.splice(index, 1)
      }
    })
    localStorage.setItem('cartList', JSON.stringify(state.cartList))
  },
  deleteGoods (state) {
    if (state.cartList != null) {
      state.temp = state.cartList.filter(item => {
        if(item.checked === true) {
          return item
        }
      })
      state.cartList.splice(state.temp, state.temp.length)
      localStorage.setItem('cartList', JSON.stringify(state.cartList))
    }
  },
  increment (state, id) {
    state.cartList.forEach(item => {
      if(item.iid == id) {
        item.count++
        if (item.count > 99 ) {
          item.count = 99
          this.$toast.dialog('最多购买99件!', 1500)
        }
      }
    })
    localStorage.setItem('cartList', JSON.stringify(state.cartList))
  },
  decrement (state, id) {
    state.cartList.forEach(item => {
      if(item.iid == id) {
        item.count--
      }
    })
    localStorage.setItem('cartList', JSON.stringify(state.cartList))
  }
}
