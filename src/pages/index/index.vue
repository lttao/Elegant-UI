<template>
  <view class="content">
    <!-- <image class="logo" src="@/static/logo.png"></image>
   <view>
      <text class="title">{{ title }}</text>
    </view> -->
    <!-- <EButton @click="handelClick" loading size="middle" loading-text="加载中..." borderRadius="10" round>按钮</EButton>
    <EButton @click="handelClick" plain borderRadius="10" round>按钮</EButton>
    <EButton @click="handelClick" disabled loading type="warning" loading-text="加载中..." borderRadius="10" round>按钮</EButton>
    <EIcon />
    <ELoadingIcon type="circular" />
    <ELoadingIcon color="red" />

    <EButton @click="showMask = true" borderRadius="10" round>按钮</EButton> -->
    <!-- <EPopup @click="showMask = false" v-model="showMask">
      <view style="height: 750rpx; width: 750rpx; background: #fff;"></view>
    </EPopup> -->
    <!-- <e-modal @confirm="handleConfirm" v-model="showMask" async title="提示" content="你确定吗？"></e-modal> -->

    <!-- <EImage :src="src" width="100px" height="100px" />
    <ESwitch v-model="switchStatus" />
    <ELoadMore status="LOADING" />
    <ELoadMore status="END" />
    <ETab @change="current = $event" :current="current" :list="list" /> -->

    <ESticky>哈哈</ESticky>
    <view style="height: 1000px;"></view>
  </view>
</template>

<script>
import EButton from '@/packages/button/EButton.vue'
import EIcon from '@/packages/icon/EIcon.vue'
import EPopup from '@/packages/popup/EPopup.vue'
import EModal from '@/packages/modal/EModal.vue'
import EImage from '@/packages/image/EImage.vue'
import ESwitch from '@/packages/switch/ESwitch.vue'
import ELoadingIcon from '@/packages/icon/ELoadingIcon.vue'
import ELoadMore from '@/packages/loadMore/ELoadMore.vue'
import ETab from '@/packages/tab/ETab.vue'
import ESticky from '@/packages/sticky/ESticky.vue'
export default {
  data() {
    return {
      title: 'Hello',
      showMask: false,
      src: '',
      switchStatus: false,
      list: ['全部', '待支付', '已完成'],
      current: 0
    }
  },
  components: {
    EButton,
    EIcon,
    EPopup,
    EModal,
    EImage,
    ESwitch,
    ELoadingIcon,
    ELoadMore,
    ETab,
    ESticky
  },
  onLoad() {
    setTimeout(() => {
      this.src = '4'
    }, 3000);
  },
  onPageScroll({scrollTop}) {
    // console.log(scrollTop);
  },
  methods: {
    handleConfirm() {
      setTimeout(() => {
        this.showMask = false
      }, 1000);
    },
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
