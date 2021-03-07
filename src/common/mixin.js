import { debounce } from './utils'
import BackTop from 'components/content/backTop/BackTop'

export const itemListListenerMixin = {
  data () {
    return {
      itemImgListener: '',
      refresh: ''
    }
  },
  mounted () {
    this.refresh = debounce(this.$refs.scrollRef.refresh, 50)
    this.itemImgListener = () => {
      this.refresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener)
  }
}

export const backTopMixin = {
  data () {
    return {
      // 控制返回顶部的显示与隐藏
      isShowBackTop: false,
    }
  },
  components: {
    BackTop
  },
  methods: {
    // 返回顶部
    backClick () {
      this.$refs.scrollRef && this.$refs.scrollRef.scrollTo(0, 0)
    }
  }
}



