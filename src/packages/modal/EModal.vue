<template>
    <e-popup
        @input="handleChange"
        :value="value"
        position="center"
        :z-index="zIndex"
        :close-on-tap-overlay="closeOnTapOverlay"
        :mask-style="maskStyle"
        :margin-top="marginTop"
    >
        <view :style="[modalStyle]" class="e-modal">
            <view v-if="title" :style="[titleStyle]" class="e-modal_title e-border-bottom">{{ title }}</view>
            <view :style="[contentStyle]" class="e-modal_content">
                <text>{{ content }}</text>
            </view>
            <view class="e-modal_actions e-border-top">
                <view @click="handleCancel" :style="[cancelStyle]" class="e-modal_cancel e-modal_button e-border-right" hover-class="e-hover">{{ cancelText }}</view>
                <view @click="handleConfirm" :style="[confirmStyle]" class="e-modal_confirm e-modal_button" :hover-class="confirmLoading ? 'none' : 'e-hover'">
                    <e-loading-icon v-if="confirmLoading" :size="40" />
                    <text v-else>{{ confirmText }}</text>
                </view>
            </view>
        </view>
    </e-popup>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Mixins } from 'vue-property-decorator'
import mixin from '../_mixins/mixins'
import EPopup from '../popup/EPopup.vue'
import ELoadingIcon from '../icon/ELoadingIcon.vue'

@Component ({
    components: { EPopup, ELoadingIcon }
})
export default class EModal extends Mixins(mixin) {
    @Prop({
        type: Boolean,
        default: false
    }) value!: boolean // 推荐使用v-model 控制显隐
    @Prop({
        type: Boolean,
        default: false
    }) async!: boolean // 是否异步
    @Prop({
        type: Boolean,
        default: false
    }) private closeOnTapOverlay!: boolean // 是否触发蒙层事件
    @Prop({
        type: [Number, String],
        default: 88
    }) private zIndex!: number | string
    @Prop({
        type: [Number, String],
        default: 700
    }) private width!: number | string
    @Prop({
        type: [Number, String],
        default: 450
    }) private minHeight!: number | string
    @Prop({
        type: [Number, String],
        default: 'auto'
    }) private maxHeight!: number | string
    @Prop({
        type: [Number, String],
        default: 20
    }) private borderRadius!: number | string
    @Prop({
      type: [Number, String],
      default: 0
    }) marginTop!: number | string // 调整垂直位置
    @Prop(String) private title!: string
    @Prop(String) private content!: string
    @Prop({
        type: String,
        default: '取消'
    }) private cancelText!: string
    @Prop({
        type: String,
        default: '确认'
    }) private confirmText!: string
    @Prop({
        type: Object,
        default: () => ({})
    }) private titleStyle!: {}
    @Prop({
        type: Object,
        default: () => ({})
    }) private contentStyle!: {}
    @Prop({
        type: Object,
        default: () => ({})
    }) private cancelStyle!: {}
    @Prop({
        type: Object,
        default: () => ({})
    }) private confirmStyle!: {}
    @Prop({
        type: Object,
        default: () => ({})
    }) private maskStyle!: any // 蒙层样式

    private confirmLoading: boolean = false

    get modalStyle() {
        const { addUnit, width, minHeight, maxHeight, borderRadius } = this
        return {
            width: addUnit(width),
            minHeight: addUnit(minHeight),
            maxHeight: addUnit(maxHeight),
            borderRadius: addUnit(borderRadius)
        }
    }

    @Watch('value') onValueChange(n: boolean, o: boolean) {
        if (this.async && n) this.confirmLoading = false
    }

    private handleConfirm() {
        const { async, confirmLoading, handleCancel } = this
        if (confirmLoading) return
        if (async) this.confirmLoading = true
        else handleCancel()
        this.$emit('confirm')
    }

    private handleCancel() {
        this.handleChange(false)
    }

    private handleChange(status: boolean) {
        this.$emit('input', status)
    }
}
</script>

<style lang="scss" scoped>
@import '../_styles/layout.scss';
.e-modal {
    background: #fff;
    display: flex;
    flex-direction: column;
    &_title {
        height: 88rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 16px;
    }
    &_content {
        flex: 1;
        padding: 20rpx 30rpx 40rpx 30rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        color: #666;
        box-sizing: border-box;
    }
    &_actions {
        height: 100rpx;
        display: flex;
        align-items: center;
    }
    &_button {
        flex: 1;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 500;
        font-size: 16px;
    }
    &_cancel {
        color: $e-disabled-color;
    }
    &_confirm {
        color: $e-primary-color;
    }
}
</style>