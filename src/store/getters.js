export default {
  cartLength (state) {
    state.cartList = localStorage.getItem('cartList')
    if (state.cartList != []) {
      state.cartList = JSON.parse(state.cartList)
      return state.cartList && state.cartList.length
    } else {
      return 0
    }
  },
  cartList (state) {
    return state.cartList
  },
  totalPrice (state) {
    if (state.cartList != []) {
      return '￥' + state.cartList.filter(item => {
        if (item.checked === true)  {
          return item
        }
      }).reduce((preVal, item) => {
        return preVal + Number(item.price.split('').slice(1).join('')) * item.count
      }, 0).toFixed(2)
    }
  },
  checkedLength (state) {
    if (state.cartList != []) {
      return state.cartList.filter(item => {
        if (item.checked === true)  {
          return item
        }
      }).length
    }
  }
}
