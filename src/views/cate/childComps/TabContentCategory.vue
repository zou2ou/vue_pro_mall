<template>
  <div>
    <grid-view :cols="3" :lineSpace="15" :v-margin="20" v-if="subcategories.list">
      <div class="item" v-for="(item, index) in subcategories.list" :key="index">
        <a href="javaScript:" @click="showDialog">
          <img @load="imgLoad" class="item-img" :src="item.image" alt="">
          <div class="item-text">{{item.title}}</div>
        </a>
      </div>
    </grid-view>
  </div>
</template>

<script>
import GridView from 'components/common/gridView/GirdView'

export default {
  data () {
    return {
      isLoad: false
    }
  },
  components: {
    GridView
  },
  props: {
    subcategories: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    showDialog () {
      this.$toast.dialog('该功能正在开发中!', 1500)
    },
    imgLoad () {
      // 防止HomeSwiper 多次发出事件
      if (!this.isLoad) {
        this.$emit('imgLoad')
        this.isLoad = true
      }
    }
  }
}
</script>

<style scoped>
.panel img {
  width: 100%;
}

.item {
  text-align: center;
  font-size: 12px;
}

.item-img {
  width: 80%;
}

.item-text {
  margin-top: 15px;
}
</style>
