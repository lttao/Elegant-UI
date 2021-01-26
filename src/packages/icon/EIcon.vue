<template>
  <view @click="handleTap" :style="[sizeStyle, wrapStyle]" class="e-icon">
    <image v-if="isImage" :src="name" :mode="mode" :style="[sizeStyle]" class="e-icon_img"></image>
    <text v-else :style="[iconStyle]" :class="customClass" class="iconfont"></text>
  </view>
</template>

<script lang="ts">
import { Component, Mixins, Prop, Vue } from "vue-property-decorator"
import mixin from '../_mixins/mixins'

@Component
export default class EIcon extends Mixins(mixin) {
    @Prop({
        type: String,
        default: ''
    }) private name!: string // 图标类名
    @Prop(String) private color!: string // 图标颜色（字体图标生效）
    @Prop(String) private customPrefix!: string // 自定义扩展前缀，方便用户扩展自己的图标库（字体图标生效）
    @Prop({
        type: String,
        default: 'aspectFit'
    }) private mode!: string // 图片的mode（图片图标生效）
    @Prop([String, Number]) private width!: string | number // 图标边缘宽度
    @Prop([String, Number]) private height!: string | number // 图标边缘高度
    @Prop({
        type: [String, Number],
        default: 40
    }) private size!: string | number // 图标大小
    @Prop(Boolean) private bold!: boolean // 图标加粗（字体图标生效）

    get customClass() {
        const { customPrefix, name } = this
        return customPrefix + name
    }
    get isImage() {
        return this.name.indexOf('/') !== -1
    }
    get iconStyle() {
        const { addUnit, bold, color, size } = this
        return {
            fontSize: addUnit(size),
            color,
            fontWeight: bold ? 'bold' : '400'
        }
    }
    get wrapStyle() {
        const { name } = this
        return {
            backgroundColor: name ? '' : '#f6f6f6'
        }
    }
    get sizeStyle() {
        const { addUnit, height, size, width } = this
        const style: any = {}
        // 优先使用width和height属性，否则使用size属性
        style.width = width ? addUnit(width) : addUnit(size)
        style.height = height ? addUnit(height) : addUnit(size)
        return style
    }

    public handleTap() {
        this.$emit('click')
    }
}
</script>
