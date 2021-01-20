<template>
  <view class="content">
    <image class="logo" src="@/static/logo.png"></image>
    <view>
      <text class="title">{{ title }}</text>
    </view>
    <EButton :font-size="60" color="red" />
  </view>
</template>

<script>
import EButton from '@/packages/button/EButton.vue'
export default {
  data() {
    return {
      title: 'Hello'
    }
  },
  components: {
    EButton
  },
  onLoad() {},
  methods: {}
}
</script>

<style lang="scss">
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin: 200rpx auto 50rpx auto;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
