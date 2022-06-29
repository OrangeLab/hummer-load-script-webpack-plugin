<template>
  <view class="page">
    <text class="slogan" @tap="lazyLog">{{slogan}}</text>
  </view>
</template>
<style lang="less" scoped>
  .page{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .slogan{
    font-size: 0.42rem;
  }
</style>

<script>

export default {
  pageConfig: {
    canScroll: false
  },
  data(){
    return {
      slogan: '~ Hello Tenon !!! ~'
    }
  }
}
</script>