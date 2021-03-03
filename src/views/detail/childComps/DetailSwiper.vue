<template>
    <swiper  class="detail-swiper">
      <swiper-item v-for="item in topImages">
        <img :src="item" alt="" @load="imageLoad">
      </swiper-item>
    </swiper>
</template>

<script>
import { Swiper, SwiperItem} from 'components/common/swiper'
export default {
  data () {
    return {
      isLoad: false
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    topImages: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    imageLoad () {
      if(!this.isLoad) {
        this.$emit('detailImageLoad')
        this.isLoad = true
      }
    }
  }
}
</script>

<style scoped>
  .detail-swiper {
    height: 300px;
    overflow: hidden;
  }
</style>
