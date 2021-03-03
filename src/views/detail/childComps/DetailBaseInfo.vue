<template>
  <div class="base-info" v-if="Object.keys(goods).length !== 0">
    <div class="goods-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="new-price">{{goods.newPrice}}</span>
      <span class="old-price">{{goods.oldPrice}}</span>
      <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
    </div>
    <div class="goods-column">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-service">
      <span v-for="item in goods.services.length-1" class="info-service-item">
        <img :src="goods.services[item-1].icon" alt="">
        <span>{{goods.services[item-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
   goods: {
     type: Object,
     default () {
       return {}
     }
   }
  }
}
</script>

<style scoped>
.base-info {
  margin-top: 15px;
  padding: 0 8px;
  color: #999;
  border-bottom: 5px solid #f2f5f8;
}
  .goods-title {
    color: #222;
  }
  .info-price {
    margin-top: 10px;
  }
  .info-price .new-price {
    font-size: 24px;
    color: var(--color-high-text);
  }
  .info-price .old-price {
    font-size: 13px;
    margin-left: 5px;
    text-decoration: line-through;
  }
  .info-price .discount {
    font-size: 14px;
    padding: 2px 5px;
    color: #fff;
    background-color: var(--color-high-text);
    border-radius: 8px;
    margin-left: 5px;
    position: relative;
    top:-8px;
    left:-3px;
  }
  .goods-column {
    display: flex;
    /*text-align: center;*/
    margin-top: 10px;
    font-size: 13px;
    line-height: 30px;
    border-bottom: 1px solid rgba(100,100,100,.1);
  }
  .goods-column>span {
    flex: 1;
  }
  .info-service {
    display: flex;
    line-height: 60px;
    justify-content: space-between;
  }
  /*.info-service-item {*/
  /*  flex: 1;*/
  /*}*/
  .info-service-item img {
    width: 14px;
    height: 14px;
    position: relative;
    top: 2px;
  }

  .info-service-item span {
    font-size: 10px;
    color: #333;
  }
</style>
