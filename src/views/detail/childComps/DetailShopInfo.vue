<template>
  <div class="info-shop">
    <div class="info-title">
      <img :src="shop.logo" alt="">
      <span class="title">{{shop.name}}</span>
    </div>
    <div class="shop-content">
      <div class="shop-content-left">
        <div class="info-sell">
          <span class="sells-count">{{shop.sells | sellCountFilter}}</span>
          <span class="sells-text">总销量</span>
        </div>
        <div class="info-goods">
          <span class="goods-count">{{shop.goodsCount}}</span>
          <span class="goods-text">全部宝贝</span>
        </div>
      </div>
      <div class="shop-content-right">
        <table>
          <tr v-for="(item, index) in shop.score" :key="index">
            <td>{{item.name}}</td>
            <td class="score" :class="{'score-better': item.isBetter}">{{item.score}}</td>
            <td class="better" :class="{'better-more': item.isBetter}">
              <span>{{item.isBetter ? '高' : '低'}}</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    shop: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  filters: {
    sellCountFilter (value) {
      if (value < 10000) return value;
      return (value/10000).toFixed(2) + '万'
    }
  }
}
</script>

<style scoped>
  .info-shop {
    padding: 25px 8px;
    border-bottom: 5px solid #f2f5f8;
  }
  .info-title {
    line-height: 45px;
    display: flex;
    align-items: center;
  }
  .info-title img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: 1px solid rgba(0,0,0,.1);
  }
  .info-title .title {
    margin-left: 10px;
    vertical-align: center;
  }
  .shop-content {
    display: flex;
    align-items: center;
    margin-top: 15px;
  }
  .shop-content .shop-content-left {
    flex: 1;

    display: flex;
    justify-content: space-evenly;
    color: #333;
    text-align: center;
    border-right: 1px solid rgba(0,0,0,.1);
  }
  .shop-content .shop-content-left .info-sell, .info-goods {
    display: flex;
    flex-direction: column;
  }
   .sells-count, .goods-count {
    font-size: 18px;
  }
  .sells-text, .goods-text {
    margin-top: 10px;
    font-size: 12px;
  }
  .shop-content-right {
    font-size: 13px;
    color: #333;
  }
  .shop-content-right table {
    width: 120px;
    margin-left: 30px;
  }
  .shop-content-right table td{
    padding: 5px 0;
  }
  .shop-content-right .score {
    color: #5ea732;
  }
  .shop-content-right .score-better {
    color: #f13e3a;
  }
  .shop-content-right .better span {
    background-color: #5ea732;
    color: #fff;
    text-align: center;
  }
  .shop-content-right .better-more span {
    background-color: #f13e3a;
  }
  .shop-bottom {
    text-align: center;
    margin-top: 10px;
  }

  .enter-shop {
    display: inline-block;
    font-size: 14px;
    background-color: var(--color-high-text);
    width: 150px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 10px;
    color: #fff
  }
</style>
