<template>
  <div class="cart-list">
    <cart-list-item
      :key="index"
      v-for="(item, index) in cartList"
      :itemInfo="item" class="cart-list-item">
      <div class="delete" slot="delete">
        <span>删除</span>
      </div>
    </cart-list-item>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import CartListItem from './CartListItem'

export default {
  components: {
    CartListItem
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  methods: {

  }
}
</script>

<style scoped>
  .cart-list-item {
    position: absolute;
    z-index: 15;
  }
  .delete {
    height: 100%;
    width: 60px;
    line-height: 100%;
    background-color: red;
    color: #fff;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
