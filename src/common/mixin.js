import { debounce } from './utils'
import BackTop from 'components/content/backTop/BackTop'

import {POP, NEW, SELL} from './const'

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


export const tabControlMixin = {
  data: function () {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      console.log(this.currentType)
    }
  }
}

