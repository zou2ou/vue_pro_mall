<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button @click.native="changeChecked" :is-checked="isSelectAll" class="check-button"/>
      <span>全选</span>
    </div>
    <div class="delete-goods" @click="deleteGoods">
      <a href="javaScript:" :class="{change: isChangeColor}">删除</a>
    </div>
    <div class="total-price">
      合计: {{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      去计算 ({{checkedLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      isChange: false,
      temp: []
    }
  },
   components: {
    CheckButton
  },
  computed: {
   ...mapGetters(['totalPrice', 'checkedLength', 'cartList']),
    isSelectAll () {
     // 数字取反是false  0取反是true
     //  if (this.cartList.length === 0) return false
      // return !(this.cartList.filter(item => !item.checked).length)
      // !undefined 是false
      if (this.cartList.length === 0) return false
      return !this.cartList.find(item => !item.checked)
      // for (let item of this.cartList) {
      //   if(!item.checked) {
      //     return false
      //   }
      // }
      // return true
    },
    isChangeColor () {
      return !!this.cartList.find(item => item.checked)
    }
  },
  methods: {
    deleteGoods () {
      if(this.isChangeColor) {
        if(confirm("确实要删除吗?")){
          this.$store.commit('deleteGoods')
        }
      }
    },
    changeChecked () {
      if (this.isSelectAll) {
        // 全不选中
        this.cartList.forEach(item => item.checked = false)
        localStorage.setItem('cartList', JSON.stringify(this.cartList))
      }else {
        // 部分或全部不选中
        this.cartList.forEach(item => item.checked = true)
        localStorage.setItem('cartList', JSON.stringify(this.cartList))
      }
      // 错误处理
      // this.cartList.forEach(item => item.checked = this.isSelectAll)
    },
    calcClick () {
      if(!this.isSelectAll) {
        this.$toast.dialog('请选择需要购买的商品!', 1500)
      }else {
        this.$toast.dialog('该功能正在开发中!', 1500)
      }
    }
  }
}
</script>

<style scoped>
  .bottom-bar {
    display: flex;
    height: 40px;
    background-color: #eee;
    position: relative;
    line-height: 40px;
    font-size: 14px;
    touch-action: none;
  }
  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }
  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
  .total-price {
    margin-left: 20px;
    flex: 1;
  }
  .calculate {
    display: flex;
    width: 90px;
    background-color: red;
    color: #fff;
    justify-content: center;
  }
  .delete-goods a{
    color:#4C4C4C;
    font-size: 13px;
  }
  .change {
    color: red!important;
  }
</style>
