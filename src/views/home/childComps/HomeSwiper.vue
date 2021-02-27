<template>
  <div>
    <swiper>
      <swiper-item v-for="item in banners">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageload">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper,  SwiperItem } from 'components/common/swiper'

export default {
  data () {
    return {
      isLoad: false
    }
  },
  props: {
    banners:{
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    // 监听轮播图加载完成 , 可获取tabControl 的offsetTop 的值
    imageload () {
      // 防止HomeSwiper 多次发出事件
      if (!this.isLoad) {
        this.$emit('swiperImageLoad')
        this.isLoad = true
      }
    }
  }
}
</script>

<style scoped>

</style>
