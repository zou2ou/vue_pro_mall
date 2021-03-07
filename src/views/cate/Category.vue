<template>
  <div id="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <tab-control class="tabControl" ref="tabControl1" :titles="['综合', '新品', '销量']"
                 @tabClick="tabClick" v-show="isTabFixed"/>
    <div class="content">
      <tab-menu :categories="categories"
                @selectItem="selectItem"/>

      <scroll @scroll="scroll" :pull-up-load="true" :probe-type="3" ref="scrollRef" id="tab-content" :data="categoryData">
        <tab-content-category @imgLoad="imgLoad" :subcategories="showSubcategory"/>
        <tab-control ref="tabControl2"  :titles="['综合', '新品', '销量']"
                       @tabClick="tabClick"/>
        <tab-content-detail :category-detail="showCategoryDetail"/>
      </scroll>
    </div>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

import TabMenu from './childComps/TabMenu'
import TabControl from 'components/content/tabControl/TabControl'
import Scroll from 'components/common/scroll/Scroll'
import TabContentCategory from './childComps/TabContentCategory'
import TabContentDetail from './childComps/TabContentDetail'

import {getCategory, getSubcategory, getCategoryDetail} from 'network/category'
import {POP, SELL, NEW} from 'common/const'
import {itemListListenerMixin, backTopMixin } from 'common/mixin'

export default {
  components: {
    NavBar,
    TabMenu,
    TabControl,
    Scroll,
    TabContentCategory,
    TabContentDetail
  },
  mixins: [itemListListenerMixin, backTopMixin],
  data() {
    return {
      categories: [],
      categoryData: {},
      currentIndex: -1,
      currentType: POP,
      // tabControl 距顶部距离
      tabOffsetTop: 0,
      // // tabControl 吸顶状态
      isTabFixed: false,
    }
  },
  created() {
    // 1.请求分类数据
    this._getCategory()
  },
  beforeUpdate () {
    this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
  },
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) return {}
      return this.categoryData[this.currentIndex].subcategories
    },
    showCategoryDetail() {
      if (this.currentIndex === -1) return []
      return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
    }
  },
  methods: {
    _getCategory() {
      getCategory().then(res => {
        // 1.获取分类数据

        this.categories = res.data.category.list
        // 2.初始化每个类别的子数据
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              'pop': [],
              'new': [],
              'sell': []
            }
          }
        }
        // 3.请求第一个分类的数据
        this._getSubcategories(0)
      })
    },
    _getSubcategories(index) {
      this.currentIndex = index;
      const mailKey = this.categories[index].maitKey;
      getSubcategory(mailKey).then(res => {
        this.categoryData[index].subcategories = res.data
        this.categoryData = {...this.categoryData}
        this._getCategoryDetail(POP)
        this._getCategoryDetail(SELL)
        this._getCategoryDetail(NEW)
      })
    },
    _getCategoryDetail(type) {
      // 1.获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      // 2.发送请求,传入miniWallkey和type
      getCategoryDetail(miniWallkey, type).then(res => {
        // 3.将获取的数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = res
        this.categoryData = {...this.categoryData}
      })
    },
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
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    /**
     * 事件响应相关的方法
     */
    selectItem(index) {
      this._getSubcategories(index)
    },
    scroll (position) {
      this.$refs.scrollRef.refresh()
      // 1. 判断BackTop 进行显示
      this.isShowBackTop = -position.y > 1000
      // 2. 决定tabControl 是否吸顶(position: fixed)
      // 通过动态改变tabControl 的样式时,会出现两个问题
      // 问题一: 下面的商品内容会突然上移
      // 问题二: tabControl 虽然设置fixed, 但是也随着Better-Scroll 一起滚动出去
      // 在最上面多复制一份tabControl 组件对象,利用它来达到停留效果
      this.isTabFixed = -position.y > this.tabOffsetTop
    },
    imgLoad () {
      this.$refs.scrollRef.refresh()
    }
  }
}
</script>

<style scoped>
#category {
  height: 100vh;
  touch-action: none;
}

.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
}

.content {
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
  display: flex;
}

#tab-content {
  height: calc(100%);
  overflow: hidden;
  flex: 1;
}
.tabControl {
  position: relative;
  width: calc(100% - 100px);
  z-index: 1;
  float: right;
}
</style>
