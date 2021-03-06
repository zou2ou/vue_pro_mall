<template>
  <div id="shop-item"
       @touchstart="touchStart"
       @touchmove="touchMove"
       @touchend="touchEnd"
       class="v relative"
       :style="deleteSlider">
    <div class="item-selector">
      <check-button @click.native="checkClick(itemInfo.iid)" :isChecked="itemInfo.checked"/>
    </div>
    <div class="item-img">
      <img :src="itemInfo.image" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{itemInfo.title}}</div>
      <div class="item-desc">商品描述: {{itemInfo.desc}}</div>
      <div class="info-bottom">
        <div class="item-price">{{itemInfo.price}}</div>
        <div class="item-count">
          <button class="right-radius" :disabled="itemInfo.count > 1 ? disable : !disable" @click="sub(itemInfo.iid)">-</button>
          <input class="cinput" type="text" :value="itemInfo.count" @input="changeVal(itemInfo.iid, $event)">
          <button :disabled="itemInfo.count < 100 ? disable : !disable" class="left-radius" @click="add(itemInfo.iid)">+</button>
        </div>
      </div>
    </div>
    <div class="delete" ref="remove" @click="deleteLine(itemInfo.iid)">
      <slot name="delete"></slot>
    </div>
<!--    <div class="mask none" :class="{ show: isShow }" @touchend='cancel'>-->
<!--      <div>-->
<!--        <div class="delete">-->
<!--          <span @click="deleteGoodsItem(itemInfo.iid)">删除</span>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
export default {
  data () {
    return {
      loop: null,
      isShow: false,
      startX: 0,   // 触摸位置
      endX: 0,     // 结束位置
      moveX: 0,    // 滑动时的位置
      disX: 0,     // 移动距离
      deleteSlider: '',// 滑动时的效果,使用v-bind:style="deleteSlider"
      disable: false,
      cartList: []
    }
  },
  components: {
    CheckButton
  },
  props: {
    itemInfo: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    checkClick (id) {
      this.cartList = JSON.parse(localStorage.getItem('cartList'))
      this.cartList.forEach(item => {
        if(item.iid === id) {
          this.itemInfo.checked = !this.itemInfo.checked
          // item.checked = !item.checked
          this.$store.commit('changeCheck', item)
        }
      })
      localStorage.setItem('cartList', JSON.stringify(this.cartList))
    },
    // longTimeTouch () {
    //   clearTimeout(this.loop)
    //   this.loop = setTimeout(() => {
    //     this.isShow = true
    //   }, 500)
    // },
    // emptyTime () {
    //   clearTimeout(this.loop)
    // },
    // deleteGoodsItem (id) {
    //   this.$store.commit('deleteGoodsItem', id)
    //   this.isShow = false
    // },
    // cancel () {
    //   this.isShow = false
    // }
    touchStart(ev){
      ev = ev || event
      //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
      if(ev.touches.length == 1){
        // 记录开始位置
        this.startX = ev.touches[0].clientX;
      }
    },
    touchMove(ev){
      ev = ev || event;
      //获取删除按钮的宽度，此宽度为滑块左滑的最大距离
      let wd  = 60;
      if(ev.touches.length == 1) {
        // 滑动时距离浏览器左侧实时距离
        this.moveX = ev.touches[0].clientX
        //起始位置减去 实时的滑动的距离，得到手指实时偏移距离
        this.disX = this.startX - this.moveX;
        //console.log(this.disX)
        // 如果是向右滑动或者不滑动，不改变滑块的位置
        if (this.disX < 0 || this.disX == 0) {
          this.deleteSlider = "transform:translateX(0px); transition: .3s";
        } else if (this.disX > 0) {// 大于0，表示左滑了，此时滑块开始滑动
          //具体滑动距离我取的是 手指偏移距离*5。
          this.deleteSlider = "transform:translateX(-" + this.disX*5 + "px); transition: .3s";
          // 最大也只能等于删除按钮宽度
          if (this.disX*5 >= wd) {
            this.deleteSlider = "transform:translateX(-" +wd+ "px); transition: .3s";
          }
        }
      }
    },
    touchEnd(ev){
      ev = ev || event;
      let wd = 60;
      if (ev.changedTouches.length == 1) {
        let endX = ev.changedTouches[0].clientX;
        this.disX = this.startX - endX;
        //console.log(this.disX)
        //如果距离小于删除按钮一半,强行回到起点
        if ((this.disX*5) < (wd/2)) {
          this.deleteSlider = "transform:translateX(0px); transition: .3s";
        }else{
          //大于一半 滑动到最大值
          this.deleteSlider = "transform:translateX(-"+wd+ "px); transition: .3s";
        }
      }
    },
    deleteLine (id){
      this.$store.commit('deleteGoodsItem', id)
      this.deleteSlider = "transform:translateX(0px) ; transition: .3s"

    },
    add (id) {
      this.$store.commit('increment', id)
    },
    sub (id) {
      this.$store.commit('decrement', id)
    },
    changeVal (id, e) {
      this.cartList = this.$store.state.cartList
      this.cartList.forEach(item => {
        if (item.iid == id) {
          if(e.target.value < 100) {
            item.count = e.target.value
          }else {
            item.count = 99
            this.$toast.dialog('最多购买99件!', 1500)
          }
          if (item.count > 1) {
            this.disable = false
          }else {
            this.disable = true
          }
        }
      })
      localStorage.setItem('cartList', JSON.stringify(this.cartList))
    }
  }
}
</script>

<style scoped>
  #shop-item {
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    z-index: 10;
    border-bottom: 1px solid #ccc;
    touch-action: none;
  }

  .item-selector {
    width: 14%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item-title, .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .item-img {
    padding: 5px;
    /*border: 1px solid #ccc;*/
  }

  .item-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }

  .item-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }

  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }

  .info-bottom {
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
    display: flex;
    justify-content: space-between;
  }

  .info-bottom .item-price {
    color: orangered;
    width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .info-bottom .item-count{
    text-align: center;
    display: flex;
  }
  .item-count .cinput {
    width: 22px;
    height: 22px;
    text-align: center;
    border: none;
    border-top: 1px solid rgb(118, 118, 118);
    border-bottom: 1px solid rgb(118, 118, 118);
  }
  .item-count button {
    width: 22px;
    height: 22px;
    text-align: center;
  }
  .right-radius {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    border: 1px solid rgb(118, 118, 118);
    outline: none;
  }
  .left-radius {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    border: 1px solid rgb(118, 118, 118);
    outline: none;
  }
  /*.mask {*/
  /*  position: absolute;*/
  /*  background: rgba(21, 21, 21, .5);*/
  /*  height: 100%;*/
  /*  width: 100%;*/

  /*}*/
  /*.mask>div {*/
  /*  height: 100%;*/
  /*  width: 100%;*/
  /*  display: flex;*/
  /*  justify-content: center;*/
  /*  align-items: center;*/
  /*}*/
  /*.none {*/
  /*  display: none;*/
  /*}*/
  /*.show {*/
  /*  display: block;*/
  /*}*/
  .delete {
    /*height: 75px;*/
    /*width: 75px;*/
    /*border-radius: 50%;*/
    /*background-color: red;*/
    /*text-align: center;*/
    /*line-height: 75px;*/
    /*opacity: .7;*/
    position: absolute;
    right: -30px;
    top: 0px;
    height: 100%;
    opacity: .9;
  }

</style>
