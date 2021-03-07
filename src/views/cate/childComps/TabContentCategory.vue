<template>
  <div>
    <grid-view :cols="3" :lineSpace="15" :v-margin="20" v-if="subcategories.list">
      <div class="item" v-for="(item, index) in subcategories.list" :key="index">
        <a href="javaScript:" @click="showDialog">
          <img class="item-img" :src="item.image" alt="">
          <div class="item-text">{{item.title}}</div>
        </a>
      </div>
    </grid-view>
  </div>
</template>

<script>
import GridView from 'components/common/gridView/GirdView'

export default {
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
