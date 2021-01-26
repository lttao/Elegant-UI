<!-- @format -->

<template>
  <view
    @click="handleTap"
    @touchmove.stop.prevent
    hover-stop-propagation
    :style="[maskStyle]"
    class="e-mask"
  >
    <slot />
  </view>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class EMask extends Vue {
    @Prop(Boolean) private show!: boolean // 控制显隐
    @Prop({
        type: Boolean,
        default: true
    }) private maskClickAble!: boolean // 是否可以通过点击遮罩进行关闭
    @Prop({
        type: [Number, String],
        default: 98
    }) private zIndex!: boolean // 样式层级
    @Prop({
        type: [Number, String],
        default: 300
    }) private duration!: number | string // 动画的过渡时间（单位为ms）
    @Prop(String) private background!: boolean // 颜色

    get maskStyle() {
        const { background, duration, show, zIndex } = this
        const maskStyle: any = {}
        if (show) {
            maskStyle.zIndex = zIndex
            maskStyle.opacity = 1
        } else {
            maskStyle.zIndex = -1
            maskStyle.opacity = 0
        }
        background && (maskStyle.background = background)
        maskStyle.transition = `all ${+duration / 1000}s ease-in-out`
        return maskStyle
    }

    public handleTap() {
        if (!this.maskClickAble) return
        this.$emit('click')
    }
}
</script>

<style lang="scss" scoped>
@import '../_styles/var.scss';

.e-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  background: $e-mask-color;
}
</style>
