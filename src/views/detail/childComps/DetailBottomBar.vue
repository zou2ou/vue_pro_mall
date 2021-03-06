<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span  @click='handleService' class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text" @click="handleShop">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span @click="handleSelect" class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div @click="handleBuy" class="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    addToCart () {
      this.$emit('addCart')
    },
    handleService () {
      this.$toast.dialog('该功能正在开发中!', 1500)
    },
    handleShop () {
      this.$toast.dialog('该功能正在开发中!', 1500)
    },
    handleSelect () {
      this.$toast.dialog('该功能正在开发中!', 1500)
    },
    handleBuy () {
      this.$toast.dialog('该功能正在开发中!', 1500)
    }
  }
}
</script>

<style scoped>
  .bottom-bar {
    height: 49px;
    background-color: #fff;
    position: relative;
    /*bottom: 49px;*/
    display: flex;
    text-align: center;
  }
  .bar-item {
    flex: 1;
    display: flex;
  }

  .bar-item>div {
    flex: 1;
  }

  .bar-left .text {
    font-size: 13px;
  }

  .bar-left .icon {
    display: block;
    width: 22px;
    height: 22px;
    margin: 5px auto 3px;
    background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
  }

  .bar-left .service {
    background-position:0 -54px;
  }

  .bar-left .shop {
    background-position:0 -98px;
  }

  .bar-right {
    font-size: 15px;
    color: #fff;
    line-height: 49px;
  }

  .bar-right .cart {
    background-color: #ffe817;
    color: #333;
  }

  .bar-right .buy {
    background-color: #f69;
  }
</style>
