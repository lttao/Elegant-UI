<template>
  <view class="content">
    <!-- <image class="logo" src="@/static/logo.png"></image> -->
    <view>
      <text class="title">{{ title }}</text>
    </view>
    <EButton @click="handelClick" loading size="middle" loading-text="加载中..." borderRadius="10" round>按钮</EButton>
    <EButton @click="handelClick" plain borderRadius="10" round>按钮</EButton>
    <EButton @click="handelClick" disabled loading type="warning" loading-text="加载中..." borderRadius="10" round>按钮</EButton>
    <EIcon />
    <ELoadingIcon />

    <EButton @click="showMask = true" borderRadius="10" round>按钮</EButton>
    <EPopup @click="showMask = false" v-model="showMask" position="center">
      <view style="height: 200px; width: 200px; background: #fff;"></view>
    </EPopup>

    <EImage :src="src" width="100px" height="100px" />
  </view>
</template>

<script>
import EButton from '@/packages/button/EButton.vue'
import EIcon from '@/packages/icon/EIcon.vue'
import EPopup from '@/packages/popup/EPopup.vue'
import EImage from '@/packages/image/EImage.vue'
import ELoadingIcon from '@/packages/icon/ELoadingIcon.vue'
export default {
  data() {
    return {
      title: 'Hello',
      showMask: false,
      src: ''
    }
  },
  components: {
    EButton,
    EIcon,
    EPopup,
    EImage,
    ELoadingIcon
  },
  onLoad() {
    setTimeout(() => {
      this.src = '4'
    }, 3000);
  },
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
