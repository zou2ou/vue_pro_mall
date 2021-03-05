<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      scroll: ''
    }
  },
  mounted () {
    // 1. 创建BScroll 对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      touchstart: true,
      touchmove: true,

      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad

    })

    // 2. 监听滚动的位置
    if(this.probetype === 2 || this.probeType === 3) {
      this.scroll.on('scroll', position => {
        // console.log(position)
        this.$emit('scroll', position)
      })
    }
    // 解决首页中Better-Scroll 可滚动区域的问题
    // 1. Better-Scroll 在决定有多少区域可以滚动时,是根据scrollrtHeight属性决定
      // scrollerHerght 属性是根据放Better-Scroll 的content中的子组件的高度
      // 但是首页中刚开始在计算scrollerHeight 属性时,是没有将图片计算在内的,所以计算出来的告诉的错误的(1300+)
      // 后来图片加载进来之后有了新的高度,但是scrollerHeight 属性并没有进行更新
      // 所以滚动出来问题
    // 2. 如何解决
      // 监听每一张图片是否加载完成,只要有一张图片加载完成了,执行一次refresh()
      // 如何监听图片加载完成,  img.onload = function() {} (原生的js监听图片)
      // vue 中监听 @load='方法'
    // 3. 调用 refresh 方法
    // 4. 如何将GoodsListItem.vue 中的事件传入到Home.vue
      // 因为涉及到非父子组件的通信,所以这么选择事件总线
      // bus -> 总线
      // Vue.prototype.$bus = new Vue()
      // this.bus.emit('事件名称', 参数)
      // this.bus.on('事件名称', 回调函数(参数))
    // 3. 监听scroll 滚动到底部
    if(this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        // console.log('上拉加载更多')
        this.$emit('pullingUp')
      })
    }
  },
  methods: {
    scrollTo (x, y, time=1000) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    finishPullUp () {
      this.scroll && this.scroll.finishPullUp()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    getScrollY () {
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style scoped>

</style>
