<template>
  <view class="e-popup-wrapper" @touchmove.stop.prevent>
    <e-mask @click="maskTap" :show="overlay && value" :custom-style="maskStyle" :z-index="zIndex - 1" />

    <template v-if="display">
      <template v-if="position === 'center'">
        <view @click="maskTap" :style="[mergeStyle]" :class="[customClass, `e-popup-${position}`, classes]" class="e-popup">
          <view @click.stop class="e-popup_content" :style="[customStyle]">
              <slot />
          </view>
        </view>
      </template>
      <template v-else>
        <view :style="[mergeStyle]" :class="[customClass, `e-popup-${position}`, classes]" class="e-popup">
          <slot />
        </view>
      </template>
    </template>
  </view>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import EMask from '../mask/EMask.vue'

@Component ({
    components: { EMask }
})
export default class EPopup extends Vue {
    @Prop({
        type: Boolean,
        default: false
    }) private value!: boolean // 推荐使用v-model 控制显隐
    @Prop({
        type: Boolean,
        default: true
    }) private overlay!: boolean // 是否展示蒙层
    @Prop({
        type: Boolean,
        default: true
    }) private closeOnTapOverlay!: boolean // 是否触发蒙层事件
    @Prop({
        type: String,
        default: 'bottom' // top right bottom left center
    }) private position!: string
    @Prop({
        type: [Number, String],
        default: 98
    }) private zIndex!: boolean // 样式层级
    @Prop({
        type: Object,
        default: () => ({})
    }) private maskStyle!: any // 蒙层样式
    @Prop({
        type: Object,
        default: () => ({})
    }) private customStyle!: any // 自定义样式
    @Prop({
        type: String,
        default: ''
    }) private customClass!: string // 自定义类
    @Prop({
      type: [Number, String],
      default: 300
    }) duration!: number | string

    private overlayShow: boolean = false // 是否显示蒙层
    private status: string = '' // 动画状态
    private display: boolean = false
    private classes: string = ''
    private transitionEnded: boolean = false

    get mergeStyle() {
      const { duration, zIndex, customStyle } = this
      return {
        zIndex: zIndex,
        transitionDuration: `${duration}ms`,
        ...customStyle, // 避免自定义样式影响到动画属性
      }
    }

    @Watch('value') showChange(n: boolean, o: boolean) {
      if (n === o) return
      n ? this.enter() : this.leave()
    }

    private maskTap() {
      this.$emit('click-overlay')
      if (this.closeOnTapOverlay) {
        this.$emit('close', false)
        this.$emit('input', false)
      }
    }

    public enter() {
      const { position, getClassNames } = this
      const classNames = getClassNames(position)
      this.status = 'enter'
      this.$emit('before-enter')
      requestAnimationFrame(() => {
        this.$emit('enter')
        this.display = true
        this.classes = classNames.enter
        requestAnimationFrame(() => {
          this.$emit('after-enter')
          this.transitionEnded = false
          this.classes = classNames['enter-to']
        })
      })
    }
    public leave() {
      if (!this.display) return
      const { duration, position, getClassNames } = this
      const classNames = getClassNames(position)
      this.status = 'leave'
      this.$emit('before-leave')
      requestAnimationFrame(() => {
        this.$emit('leave')
        this.classes = classNames.leave
        requestAnimationFrame(() => {
          this.transitionEnded = false
          setTimeout(() => this.onTransitionEnd(), +duration)
          this.classes = classNames['leave-to']
        })
      })
    }
    // 完成过渡后触发
    private onTransitionEnd() {
      if (this.transitionEnded) return
      this.transitionEnded = true
      this.$emit(`after-${this.status}`)
      const { value, display } = this
      if (!value && display) this.display = false
    }
    private getClassNames(name: string) {
      return {
        enter: `e-${name}-enter e-${name}-enter-active`,
        'enter-to': `e-${name}-enter-to e-${name}-enter-active`,
        leave: `e-${name}-leave e-${name}-leave-active`,
        'leave-to': `e-${name}-leave-to e-${name}-leave-active`
      }
    }
}
</script>

<style lang="scss">
.e-popup {
  position: fixed;
  transition-timing-function: ease;

  &-center {
    top: 0;
    left: 0;
    bottom: 0;
    width: 750rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &-top {
    top: 0;
    left: 0;
    width: 750rpx;
  }

  &-bottom {
    bottom: 0;
    left: 0;
    width: 750rpx;
  }

  &-left {
    top: 0;
    left: 0;
    height: 100%;
  }

  &-right {
    top: 0;
    right: 0;
    height: 100%;
  }
}

.e-center-enter-active,
.e-center-leave-active {
  transition-property: all;
  transform: scale(1);
}

.e-center-enter,
.e-center-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.e-bottom-enter-active,
.e-bottom-leave-active,
.e-left-enter-active,
.e-left-leave-active,
.e-right-enter-active,
.e-right-leave-active,
.e-top-enter-active,
.e-top-leave-active {
  transition-property: transform;
}

.e-top-enter,
.e-top-leave-to {
  transform: translate3d(0, -100%, 0);
}

.e-bottom-enter,
.e-bottom-leave-to {
  transform: translate3d(0, 100%, 0);
}

.e-left-enter,
.e-left-leave-to {
  transform: translate3d(-100%, 0, 0);
}

.e-right-enter,
.e-right-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>