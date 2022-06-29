<template>
  <view class="page">
    <text class="slogan">{{slogan}}</text>
    <ex-marguee-view :textArray="textArray"></ex-marguee-view>
    <text class="slogan">{{slogan}}</text>
  </view>
</template>
<style lang="less" scoped>
  .page{
    width: 100%;
    height: 100%;
    // display: flex;
    // justify-content: center;
    // align-items: center;
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
      slogan: '~ Hello Tenon ~',
      textArray: ['1111', '22222', '3333333']
    }
  },
  methods: {
  }
}
</script>