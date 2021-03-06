<template>
  <div class="cart" >
    <!--  导航  -->
    <nav-bar class="nar-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <!--  商品的列表  -->
    <scroll class="content" ref="scrollRef">
      <cart-list/>
    </scroll>
    <!--  底部的汇总  -->
    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import Scroll from 'components/common/scroll/Scroll'
import CartBottomBar from './childComps/CartBottomBar'

import { mapGetters } from 'vuex'
export default {
  name: 'Cart',
  components: {
    NavBar,
    CartList,
    Scroll,
    CartBottomBar
  },
  computed: {
   ...mapGetters(['cartLength'])
  },
  activated() {
    this.$refs.scrollRef.refresh()
  }
}
</script>

<style scoped>
  .cart {
    height: 100vh;
    touch-action: none;
  }
  .nar-bar {
    background-color: var(--color-high-text);
    color: #fff;
  }
  .content {
    height: calc(100% - 44px - 49px - 40px);
    overflow: hidden;
  }
</style>
