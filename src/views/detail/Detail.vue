<template name="Detail">
  <div id="detail">
    <detail-nav-bar ref="navBarRef" class="detail-nav" @titleClick="titleClick"/>
    <scroll class="content" ref="scrollRef" @scroll="contentScroll" :probe-type="3">
      <ul v-for="item in $store.state.cartList">
        <li>{{item}}</li>
      </ul>
      <detail-swiper :top-images="topImages" @detailImageLoad="detailImageLoad"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @goodsInfoImageLoad="goodsInfoImageLoad"/>
      <detail-param-info :params-info="paramsInfo" ref="paramsRef"/>
      <detail-comment-info :comment-info="commentInfo" ref="commentRef"/>
      <goods-list :goods="recommends" ref="recommendsRef"/>
    </scroll>
    <detail-bottom-bar @addCart="addCart"/>
    <!--  修饰.native  需要监听组件的原生事件  -->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'
// import BackTop from 'components/content/backTop/BackTop'

import { getDetail, Goods, Shop, GoodsParam, getRecommend } from 'network/detail'
import { debounce } from 'common/utils'
import { itemListListenerMixin, backTopMixin } from 'common/mixin'

export default {
  name: 'Detail',
  data () {
    return {
      iid: '',
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramsInfo: {},
      // 获取评论信息
      commentInfo: {},
      recommends: [],
      detailTopY: [],
      getThemeTopY: '',
      tabControlY: '',
      currentIndex: 0
    }
  },
  created () {
    // 保存传入的iid
    this.iid = this.$route.params.iid
    // 根据iid 请求详情数据
    this.getDetail(this.iid)
    this.getRecommend()
    this.getThemeTopY = debounce(() => {
      this.detailTopY = []
      this.detailTopY.push(0)
      this.detailTopY.push(this.$refs.paramsRef.$el.offsetTop-44)
      this.detailTopY.push(this.$refs.commentRef.$el.offsetTop-44)
      this.detailTopY.push(this.$refs.recommendsRef.$el.offsetTop-44)
      this.detailTopY.push(Number.MAX_VALUE)

        // console.log(this.detailTopY)
    },50)
  },
  // mounted () {
  //   let refresh = debounce(this.$refs.scrollRef.refresh, 50)
  //   this.itemImgListener = () => { refresh() }
  //   this.$bus.$on('itemItemLoad', this.itemImgListener)
  // },
  updated() {
    // this.detailTopY = []
    // this.detailTopY.push(0)
    // this.detailTopY.push(this.$refs.paramsRef.$el.offsetTop)
    // this.detailTopY.push(this.$refs.commentRef.$el.offsetTop)
    // this.detailTopY.push(this.$refs.recommendsRef.$el.offsetTop)
    // console.log(this.detailTopY)
    // this.getThemeTopY()
  },
  destroyed () {
    this.$bus.$off('itemImageLoad', this.itemImgListener)
  },
  mixins: [itemListListenerMixin, backTopMixin],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    // BackTop,
    DetailBottomBar
  },
  methods: {
    // 获取详情页数据
    async getDetail (iid) {
      const { result: res } = await getDetail(iid)
      // console.log(res)
      //  获取顶部轮播图数据
      this.topImages = res.itemInfo.topImages
      //  获取商品信息
      this.goods = new Goods(res.itemInfo, res.columns, res.shopInfo.services)
      // 创建店铺信息的对象
      this.shop = new Shop(res.shopInfo)
      // 获取商品详细信息
      this.detailInfo = res.detailInfo
      // 获取参数信息
      this.paramsInfo = new GoodsParam(res.itemParams.info, res.itemParams.rule)
      // 获取评论信息
      if(res.rate.cRate !== 0) {
        this.commentInfo = res.rate.list[0]
      }

      // 等待数据渲染结束
      // this.$nextTick(() => {
      //   // 根据最新的数据,对应的DOM 时已经被渲染出来
      //   // 但是图片依然没有加载完成 此时获取的offsetTop 不包含其中的图片
      //   // offsetTop 值不对的时候,都是因为图片的问题
      //   this.detailTopY = []
      //   this.detailTopY.push(0)
      //   this.detailTopY.push(this.$refs.paramsRef.$el.offsetTop)
      //   this.detailTopY.push(this.$refs.commentRef.$el.offsetTop)
      //   this.detailTopY.push(this.$refs.recommendsRef.$el.offsetTop)
      //   console.log(this.detailTopY)
      // })
     },
    // 请求推荐数据
    async getRecommend () {
      const { data: res } = await getRecommend()
      this.recommends = res.list
    },
    // 页面无法滚动 需要在轮播图加载结束 增加refresh 事件
    detailImageLoad () {
      this.$refs.scrollRef.refresh()
    },
    goodsInfoImageLoad () {
      this.refresh()
      this.getThemeTopY()
    },
    titleClick (index) {
      this.$refs.scrollRef.scrollTo(0, -this.detailTopY[index])
    },
    contentScroll (position) {
      // 获取y 的值
      this.tabControlY = -position.y
      let length = this.detailTopY.length
      // tabControlY 和主题中的值对比
      // for (let i in this.detailTopY) {
      //   // 此时获取的i 值为字符串
      //   // if (this.tabControlY > this.detailTopY[i] && this.tabControlY < this.detailTopY[i + 1]) {
      //   //   console.log( i)
      //   // }
      // }

      // for (let i = 0;i < length; i++) {
      //   // 条件一 this.currentIndex !== i 防止赋值过于频繁
      //   // 条件二 (i < length - 1 && this.tabControlY >= this.detailTopY[i] && this.tabControlY < this.detailTopY[i + 1]) || (i === length -1 && this.tabControlY >= this.detailTopY[i])
      //       // 条件1 : i < length - 1 && this.tabControlY >= this.detailTopY[i] && this.tabControlY < this.detailTopY[i + 1]
      //         // 判断区间: 在0 和某个数字之间(i < length - 1)
      //       //条件2 : i === length -1 && this.tabControlY >= this.detailTopY[i]
      //         // 判断大于等于: i === length - 1
      //   if (this.currentIndex !== i && ((i < length - 1 && this.tabControlY >= this.detailTopY[i] && this.tabControlY < this.detailTopY[i + 1]) || (i === length -1 && this.tabControlY >= this.detailTopY[i]))) {
      //     this.currentIndex = i
      //     // console.log(this.currentIndex)
      //     this.$refs.navBarRef.currentIndex = this.currentIndex
      //   }
      // }

      for (let i = 0;i < length - 1; i++) {
        if (this.currentIndex !== i && (this.tabControlY >= this.detailTopY[i] && this.tabControlY < this.detailTopY[i + 1])) {
          this.currentIndex = i
          this.$refs.navBarRef.currentIndex = this.currentIndex
        }
      }
      // 是否显示回到顶部
      this.isShowBackTop = -position.y > 1000
      this.isTabFixed = -position.y > this.tabControlY
    },
    addCart () {
      // 获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.newPrice
      product.iid = this.iid
      // 将商品添加购物车
      // this.$store.commit('addCart', product)
      this.$store.dispatch('addCart', product)
    }
  }
}
</script>

<style scoped>
  #detail {
    position: relative;
    background-color: #fff;
    z-index: 9;
    height: 100vh;
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content {
    height: calc(100% - 44px - 49px);
    overflow: hidden;
  }
</style>
