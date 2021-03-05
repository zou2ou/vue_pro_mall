<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  // props: {
  //   message: {
  //     type: String,
  //     default: ''
  //   },
  //   isShow: {
  //     type: Boolean,
  //     default: false
  //   }
  // },
  data () {
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    dialog (message='添加成功!', duration=2000) {
      this.isShow = true
      this.message = message
      setTimeout(() => {
        this.isShow = false
        this.message = ''
      }, duration)
    }
  }
}
</script>

<style scoped>
  .toast {
    height: 60px;
    line-height: 60px;
    position: fixed;
    width: 60%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 0 10px 0;
    color: #fff;
    background-color: rgba(0,0,0, .7);
    z-index: 99;
    text-align: center;
  }
</style>
