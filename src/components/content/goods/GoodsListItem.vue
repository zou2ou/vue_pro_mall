<template>
  <div class="goods-item" @click="itemClick">
    <img
      @load="imageLoad"
      v-lazy="showImage"
      :key="showImage"
      alt="">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isLoad: false
    }
  },
  props: {
    goodsItem: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    imageLoad () {
      // if(this.$rote.path.indexOf('/home')) {
      //   this.$bus.$emit('homeItemImageLoad')
      // }else if(this.$route.path.indexOf('/detail')) {
      //   this.$bus.$emit('detailItemmageLoad')
      // }
      if(!this.isLoad) {
        this.$bus.$emit('itemImageLoad')
        this.isLoad = true
      }
    },
    itemClick () {
      this.$router.push('/detail/'+ this.goodsItem.iid)
    }
  },
  computed: {
    showImage () {
      return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
    }
  }
}
</script>

<style scoped>
  .goods-item {
    width: 48%;
    padding-bottom: 20px;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }
  .goods-info {
    font-size: 12px;
    text-align: center;
  }
  .goods-info p {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .goods-info .collect {
    position: relative;
  }
  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -13px;
    top: 0;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }

</style>
