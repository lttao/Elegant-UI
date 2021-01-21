<template>
  <view class="content">
    <image class="logo" src="@/static/logo.png"></image>
    <view>
      <text class="title">{{ title }}</text>
    </view>
    <EButton @click="handelClick" loading size="middle" loading-text="加载中..." borderRadius="10" round>按钮</EButton>
    <EButton @click="handelClick" plain borderRadius="10" round>按钮</EButton>
    <EButton @click="handelClick" disabled loading type="warning" loading-text="加载中..." borderRadius="10" round>按钮</EButton>
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
  methods: {
    handelClick() {
      uni.showToast({
        title: '标题',
        duration: 2000,
        icon: 'none',
        position: 'bottom'
      })
    }
  }
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
