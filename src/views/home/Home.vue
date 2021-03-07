<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control ref="tabControl1" :titles="['流行', '新款', '精选']" @tabClick="tabClick" class="tabControl" v-show="isTabFixed"/>
    <scroll @pullingUp="loadMore" @scroll="contentScroll" :pull-up-load="true" :probe-type="3" ref="scrollRef" class="content">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <home-recommend-view :recommends="recommends"/>
      <home-feature-view/>
      <tab-control ref="tabControl2" :titles="['流行', '新款', '精选']" @tabClick="tabClick" />
      <goods-list :goods="showGoods"/>
    </scroll>
    <!--  修饰.native  需要监听组件的原生事件  -->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
// 子组件
import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommendView from './childComps/HomeRecommendView'
import HomeFeatureView from './childComps/HomeFeatureView'
// 公共组件
import NavBar from "components/common/navbar/NavBar"
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
// import BackTop from 'components/content/backTop/BackTop'
// 额外组件
import { getHomeMultidata, getHomeGoods } from 'network/homeReq'
// import { debounce } from 'common/utils'
import  { itemListListenerMixin, backTopMixin } from 'common/mixin'
// import Swiper from 'components/common/swiper/Swiper'
// import SwiperItem from 'components/common/swiper/SwiperItem'

export default {
  data () {
    return {
      // 获取轮播图数据
      banners: [],
      recommends: [],
      // 获取商品数据
      goods: {
        'pop': { page: 0, list: [] },
        'new': { page: 0, list: [] },
        'sell': { page: 0, list: [] }
      },
      // 获取的当前页面数据
      currentType: 'pop',
      // // 控制返回顶部的显示与隐藏
      // isShowBackTop: false,
      // tabControl 距顶部距离
      tabOffsetTop: 0,
      // // tabControl 吸顶状态
      isTabFixed: false,
      // 保存位置信息
      saveY: 0
    }
  },
  mixins: [itemListListenerMixin, backTopMixin],
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    HomeFeatureView,
    TabControl,
    GoodsList,
    Scroll,
    // BackTop
  },
  created () {
    // 1. 请求多个数据
    this.getHomeMultidata(),
    // 2. 请求商品数据
    this.getHomeGoods('pop'),
    this.getHomeGoods('new'),
    this.getHomeGoods('sell')
  },
  // mounted () {
  //   // 3. 监听item 图片加载完成
  //   const refresh = debounce(this.$refs.scrollRef.refresh, 50)
  //   this.itemImgListener = () => {
  //     // 调用频繁 进行防抖操作
  //     // 防抖函数起作用的过程
  //     // 1. 如果直接执行refresh 那么refresh 函数会被执行30次
  //     // 2. 可以将refresh 函数传入到debounce 函数中,生成一个新函数
  //     refresh()
  //     // this.$refs.scrollRef && this.$refs.scrollRef.refresh()
  //   }
  //   this.$bus.$on('itemImageLoad', this.itemImgListener)
  // },
  destroyed() {
    // Home 页面离开 禁止销毁 使用keep-alive
    console.log('home destroyed')
  },
  // 让Home 中的内容保持原来的位置
  activated() {
    // 进来时讲位置设置原来保存的位置信息
    this.$refs.scrollRef.scrollTo(0, this.saveY, 0)
    this.$refs.scrollRef.refresh()
  },
  deactivated() {
    // 离开时保存位置信息
    this.saveY = this.$refs.scrollRef.getScrollY()
    // console.log(this.saveY)
    // 取消全局事件监听
    this.$bus.$off('itemImageLoad', this.itemImgListener)
  },
  computed: {
    // 返回该类型数据
    showGoods () {
      return this.goods[this.currentType].list
    }
  },
  methods: {
    /**
     * 网络请求相关方法
     * **/
    // 获取轮播图等数据
    async getHomeMultidata () {
      // getHomeMultidata().then(res => {
      //   // console.log(res)
      //   this.banners = res.data.banner.list
      //   this.recommends = res.data.recommend.list
      // })
      const { data: res } = await getHomeMultidata()
      // console.log(res)
      this.banners = res.banner.list
      this.recommends = res.recommend.list
    },
    // // 获取商品数据
    async getHomeGoods (type) {
      const page = this.goods[type].page + 1
      const { data: res } = await getHomeGoods(type, page)
      // this.goods[type].list = res.list
      this.goods[type].list.push(...res.list)
      this.goods[type].page += 1
      // 主动进行下一次的 加载更多
      this.$refs.scrollRef.finishPullUp()
    },
    /**
     * 事件监听相关方法
     * **/
    // 控制返回顶部显示与隐藏
    contentScroll (position) {
      // 1. 判断BackTop 进行显示
      this.isShowBackTop = -position.y > 1000
      // 2. 决定tabControl 是否吸顶(position: fixed)
      // 通过动态改变tabControl 的样式时,会出现两个问题
        // 问题一: 下面的商品内容会突然上移
        // 问题二: tabControl 虽然设置fixed, 但是也随着Better-Scroll 一起滚动出去
        // 在最上面多复制一份tabControl 组件对象,利用它来达到停留效果
      this.isTabFixed = -position.y > this.tabOffsetTop
    },
    // 上拉加载更多
    loadMore () {
      this.getHomeGoods(this.currentType)
      // 重新刷新图片最新滚动高度
      this.$refs.scrollRef.refresh()
    },
    // 点击切换 获得相应页面的数据
    tabClick (index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
              break
        case 1:
          this.currentType = 'new'
              break
        case 2:
          this.currentType = 'sell'
              break
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    // // 返回顶部
    // backClick () {
    //   this.$refs.scrollRef && this.$refs.scrollRef.scrollTo(0, 0)
    // },
    //监听轮播图加载完成,并获取tabControl 的offsetTop 的值
    swiperImageLoad () {
      this.$refs.scrollRef.refresh()
      // 获取tabControl 距顶部距离 在mounted的时候 不包含图片 获取的值不准确
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    }
  }
}
</script>

<style scoped>
 #home {
   /*padding-top: 44px;*/
   height: 100vh;
   position: relative;
   touch-action: none;
 }
 .home-nav {
   background-color: var(--color-tint);
   color: #fff;

   /*在使用浏览器原生滚动时,为了不让导航跟随一起滚动*/
   /*position: fixed;*/
   /*left: 0;*/
   /*right: 0;*/
   /*top: 0;*/
   /*z-index:9;*/
 }
 .content {
   overflow: hidden;
   position: absolute;
   top: 44px;
   bottom: 49px;
   left: 0;
   right: 0;
 }

 /*.content {*/
 /*  height: calc(100% - 93px);*/
 /*  overflow: hidden;*/
 /*  margin-top: 44px;*/
 /*}*/

 /*.fixed {*/
 /*  position: fixed;*/
 /*  left: 0;*/
 /*  right:0;*/
 /*  top: 44px;*/
 /*}*/

 .tabControl {
   position: relative;
   z-index: 9;
 }
</style>
