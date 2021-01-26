<template>
    <view :style="[iconContainerStyle]" class="e-loading-icon">
        <view :style="[iconStyle]" class="e-loading-loader">
            <view :style="[maskStyle]" class="e-loading-loader_before"></view>
            <view :style="[maskStyle]" class="e-loading-loader_after"></view>
            <view :style="[imageStyle]" class="e-loading-loader_content">
                <image src="/static/logo.png" class="e-loading-loader_image" />
            </view>
        </view>
    </view>
</template>

<script lang="ts">
import { Component, Mixins, Prop, Vue } from 'vue-property-decorator'
import mixin from '../_mixins/mixins'

@Component
export default class ELoadingIcon extends Mixins(mixin) {
    @Prop({
        type: [String, Number],
        default: '26px'
    }) private size!: string | number // 图标大小
    @Prop({
        type: String,
        default: '#fff'
    }) private background!: string
    @Prop(String) private color!: string
    @Prop({
        type: String,
        default: '#fff'
    }) private maskBackground!: string


    get iconContainerStyle() {
        const { addUnit, size } = this
        return {
            width: addUnit(size),
            height: addUnit(size)
        }
    }
    get iconStyle() {
        const { color } = this
        return {
            background: color
        }
    }
    get imageStyle() {
        const { background } = this
        return {
            background
        }
    }
    get maskStyle() {
        const { background, maskBackground } = this
        return {
            background: maskBackground || background
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../_styles/var.scss';
.e-loading-icon {
    position: relative;
    z-index: 1;
    // width: 30px;
    // height: 30px;
    border-radius: 50%;
    overflow: hidden;
}
.e-loading-loader {
    position: absolute;
    top: 50%;
    left: 50%;
    width: calc(100% + 2px);
    height: calc(100% + 2px);
    background: $e-primary-color;
    border-radius: 50%;
    overflow: hidden;
    transform: translate(-50%, -50%);
    &_before {
        position: absolute;
        top: 0;
        left: 0;
        width: 50%;
        height: 100%;
        background: #fff;
        transform-origin: right center;
        animation: e-load 2s infinite ease 1.5s;
    }
    &_after {
        position: absolute;
        top: 0;
        right: 0;
        width: 50%;
        height: 100%;
        background: #fff;
        transform-origin: left center;
        animation: e-load 2s infinite ease;
    }
    &_content {
        position: absolute;
        top: 50%;
        left: 50%;
        width: calc(100% - 4px);
        height: calc(100% - 4px);
        background: #f2f2f2;
        border-radius: 50%;
        overflow: hidden;
        transform: translate(-50%, -50%);
    }
    &_image {
        width: 100%;
        height: 100%;
        opacity: 0.2;
    }
}

@keyframes e-load {
	0% {transform: rotate(0deg)}
	100% {transform: rotate(360deg)}
}

</style>