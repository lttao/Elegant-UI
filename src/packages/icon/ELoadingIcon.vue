<template>
    <view v-show="show" :style="[iconStyle]" :class="'e-loading-icon_' + type" class="e-loading-icon">
        <block v-if="type === 'spinner'">
            <view v-for="(item, index) in 12" :key="index" class="e-loading-icon_dot" />
        </block>
    </view>
</template>

<script lang="ts">
import { Component, Mixins, Prop, Vue } from 'vue-property-decorator'
import mixin from '../_mixins/mixins'

@Component
export default class ELoadingIcon extends Mixins(mixin) {
    @Prop({
        type: String,
        default: 'spinner'
    }) type!: string
    @Prop({
        type: [String, Number],
        default: '24px'
    }) private size!: string | number // 图标大小
    @Prop({
        type: String,
        default: '#1890ff'
    }) private color!: string
    @Prop({
        type: Boolean,
        default: true
    }) show!: boolean

    get iconStyle() {
        const { addUnit, size, color } = this
        return {
            width: addUnit(size),
            height: addUnit(size),
            color
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../_styles/var.scss';
.e-loading-icon {
    position: relative;
    box-sizing: border-box;
    animation: e-loading-rotate .8s linear infinite;
    &_spinner {
        animation-timing-function: steps(12)
    }
    &_circular {
        border: 1px solid transparent;
        border-top-color: initial;
        border-radius: 100%
    }
    &_dot {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        &::before {
            content: " ";
            margin: 0 auto;
            display: block;
            width: 8%;
            max-width: 2px;
            height: 25%;
            border-radius: 2px;
            background-color: currentColor;
        }
        &:first-of-type{
            transform: rotate(30deg);
            opacity: 1
        }
        &:nth-of-type(2){
            transform: rotate(60deg);
            opacity: .9375
        }
        &:nth-of-type(3){
            transform: rotate(90deg);
            opacity: .875
        }
        &:nth-of-type(4){
            transform: rotate(120deg);
            opacity: .8125
        }
        &:nth-of-type(5){
            transform: rotate(150deg);
            opacity: .75
        }
        &:nth-of-type(6){
            transform: rotate(180deg);
            opacity: .6875
        }
        &:nth-of-type(7){
            transform: rotate(210deg);
            opacity: .625
        }
        &:nth-of-type(8){
            transform: rotate(240deg);
            opacity: .5625
        }
        &:nth-of-type(9){
            transform: rotate(270deg);
            opacity: .5
        }
        &:nth-of-type(10){
            transform: rotate(300deg);
            opacity: .4375
        }
        &:nth-of-type(11){
            transform: rotate(330deg);
            opacity: .375
        }
        &:nth-of-type(12){
            transform: rotate(1turn);
            opacity: .3125
        }
    }
}
@keyframes e-loading-rotate{
    0%{
        transform:rotate(0deg)
    }
    to{
        transform:rotate(1turn)
    }
}

</style>