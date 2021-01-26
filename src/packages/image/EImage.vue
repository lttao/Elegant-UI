<template>
    <view class="e-image" @click="handleTap" :style="[wrapStyle]">
    <image v-if="!isError" :src="src" :mode="mode" @error="onErrorHandler" @load="onLoadHandler" :lazy-load="lazyLoad" class="e-image-image"></image>
    <view v-if="showLoading && loading" class="e-image-loading">
      <slot v-if="$slots.loading" name="loading" />
      <e-icon v-else :name="loadingIcon" :width="iconWidth" :height="iconHeight"></e-icon>
    </view>
    <view v-if="showError && isError && !loading" class="e-image-error">
      <slot v-if="$slots.error" name="error" />
      <e-icon v-else :name="errorIcon" :width="iconWidth" :height="iconHeight" color="#ccc"></e-icon>
    </view>
  </view>
</template>

<script lang="ts">
import { Component, Mixins, Prop, Vue, Watch } from 'vue-property-decorator'
import mixin from '../_mixins/mixins'
import EIcon from '../icon/EIcon.vue'

@Component({
    components: { EIcon }
})
export default class EImage extends Mixins(mixin) {
    @Prop(String) private src!: string // 图片地址
    @Prop({
        type: String,
        default: 'aspectFill'
    }) private mode!: string // 裁剪模式
    @Prop({
        type: String,
        default: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3597053314,364663418&fm=26&gp=0.jpg'
    }) private loadingIcon!: string // 加载中的图标/图片
    @Prop({
        type: String,
        default: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2478530818,3372969471&fm=26&gp=0.jpg'
    }) private errorIcon!: string // 加载失败的图标/图片
    @Prop({
        type: [Number, String],
        default: 200
    }) private width!: number | string // 图片宽度
    @Prop({
        type: [Number, String],
        default: 200
    }) private height!: number | string // 图片高度
    @Prop({
        type: [Number, String]
    }) private borderRadius!: number | string // 图片圆角
    @Prop(Boolean) private circle!: boolean // 圆形图片
    @Prop({
        type: Boolean,
        default: true
    }) private lazyLoad!: boolean // 图片懒加载
    @Prop({
      type: Boolean,
      default: false
    }) private showMenuByLongpress!: boolean // 是否开启长按图片显示识别微信小程序码菜单
    @Prop({
        type: Boolean,
        default: true
    }) private showLoading!: boolean // 是否显示加载中的图标或者自定义的slot
    @Prop({
        type: Boolean,
        default: true
    }) private showError!: boolean // 是否显示加载错误的图标或者自定义的slot
    @Prop({
        type: Boolean,
        default: false
    }) private webp!: boolean // 只支持网络资源，只对微信小程序有效

    private isError: boolean = false // 图片错误状态
    private loading: boolean = true // 图片加载状态 

    get wrapStyle() {
        const { addUnit, borderRadius, circle, width, height } = this
        const wrapStyle = {
            width: addUnit(width),
            height: addUnit(height),
            borderRadius: circle ? '50%': addUnit(borderRadius || 0),
            overflow: borderRadius || circle ? 'hidden' : 'visible',
            zIndex: borderRadius || circle ? 1 : 0, // 解决Ios端borderRadius闪动问题
        }
        return wrapStyle
    }

    get iconWidth() {
        const { addScaleUnit, width } = this
        return addScaleUnit(width, 0.6)
    }

    get iconHeight() {
        const { addScaleUnit, height } = this
        return addScaleUnit(height, 0.6)
    }

    @Watch('src') onSrcChange(n: string) {
        if (!n) this.isError = true
        else this.isError = false
    }

    //  添加百分比单位
    public addScaleUnit(value: number | string, scale: number = 1) {
        if (typeof value === 'number') return this.addUnit(+value * scale)
        const num = value.replace(/(\d+)\w+/, '$1')
        const unit = value.replace(/\d+(\w+)/, '$1')
        return this.addUnit((+num * scale) + unit)
    }

    // 图片加载完成，标记loading结束
    public onLoadHandler() {
      this.loading = false
      this.isError = false
      this.$emit('load')
    }

    // 图片加载失败
    public onErrorHandler() {
      this.loading = false
      this.isError = true
      this.$emit('error')
    }

    public handleTap() {
        this.$emit('click')
    }
}
</script>

<style scoped lang="scss">
@import '../_styles/color.scss';
@import '../_styles/layout.scss';
.e-image {
  position: relative;
  transition: opacity 0.5s ease-in-out;

  &-image {
    width: 100%;
    height: 100%;
  }

  &-loading,
  &-error {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: $e-module-bg-color;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 46rpx;
  }
}
</style>