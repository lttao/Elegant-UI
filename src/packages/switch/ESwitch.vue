<template>
    <view @click.stop="onChange" :style="[switchStyle]" class="e-switch">
        <view class="e-switch_inner">
            <view :style="[nodeStyle, nodeStatusStyle]" class="e-switch_node">
                <e-loading-icon :show="loading" class="e-switch-loading" :size="loadingSize" />
            </view>
        </view>
    </view>
</template>

<script lang="ts">
import { Component, Mixins, Prop, Vue } from 'vue-property-decorator'
import mixin from '../_mixins/mixins'
import ELoadingIcon from '../icon/ELoadingIcon.vue'

@Component({
    components: { ELoadingIcon }
})
export default class ESwitch extends Mixins(mixin) {
    @Prop(Boolean) value!: boolean // 推荐使用v-model 控制状态
    @Prop({
      type: [Number, String],
      default: 100
    }) width!: number | string // 宽
    @Prop({
      type: [Number, String],
      default: 50
    }) height!: number | string // 高
    @Prop({
      type: [Number, String],
      default: 6
    }) padding!: number | string // 开关距离边缘的距离
    @Prop({
      type: [Number, String],
      default: 300
    }) duration!: number | string // 动画时长
    @Prop({
      type: String,
      default: '#1890ff'
    }) activeColor!: string // 打开时的背景颜色
    @Prop({
      type: String,
      default: '#f2f2f2'
    }) inactiveColor!: string // 关闭时的背景颜色
    @Prop({
      type: String,
      default: '#fff'
    }) nodeColor!: string // 开关背景颜色
    @Prop(Boolean) vibrateShort!: boolean // 是否使手机发生短促震动
    @Prop(Boolean) disabled!: boolean // 是否为禁用状态
    @Prop(Boolean) loading!: boolean // 是否为加载中状态

    private nodeInfo: any = {}
    private loadingSize: string | number = 0

    get switchStyle() {
        const { addUnit, activeColor, duration, value, inactiveColor, width, height, padding } = this
        return {
            width: addUnit(width),
            height: addUnit(height),
            borderRadius: addUnit(height),
            background: value ? activeColor : inactiveColor,
            padding: addUnit(padding),
            transition: `background-color ${duration}ms`
        }
    }

    get nodeStyle() {
        const {
            duration,
            nodeColor,
            nodeInfo: { width, height, translate }
        } = this
        return {
            width: `${width}px`,
            height: `${height}px`,
            transitionDuration: `${duration}ms`,
            background: nodeColor
        }
    }

    get nodeStatusStyle() {
        const { value, nodeInfo } = this
        const style: any = {}
        if (value) style.transform = `translate3d(${nodeInfo.translate}px, 0, 0)`
        else style.transform = `translate3d(0, 0, 0)`
        return style
    }

    private mounted() {
        this.getRect('.e-switch_inner').then(rect => {
            this.nodeInfo = {
                width: rect.height,
                height: rect.height,
                translate: rect.width - rect.height
            }
            this.loadingSize = `${rect.height * 0.6}px`
        })
    }

    private onChange() {
        const { disabled, loading } = this
        if (disabled || loading) return
        const { vibrateShort } = this

        this.$emit('input', !this.value)

        // 使手机产生短促震动
        if (vibrateShort) uni.vibrateShort({})
    }
    
}
</script>

<style lang="scss" scoped>
.e-switch {
    box-sizing: border-box;
    &_inner {
        position: relative;
        width: 100%;
        height: 100%;
    }
    &_node {
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 50%;
        box-shadow: 0 3px 1px 0 rgba(0, 0, 0, 0.05), 0 2px 2px 0 rgba(0, 0, 0, 0.1), 0 3px 3px 0 rgba(0, 0, 0, 0.05);
        display: flex;
        align-items: center;
        justify-content: center;
        transition-property: transform;
        transition-timing-function: cubic-bezier(0.3, 1.05, 0.4, 1.05);
    }
}
</style>