<template>
  <button
    @click.stop="handleTap"
    :open-type="openType"
    :loading="loading && !disabled"
    :style="[buttonStyle]"
    :class="[{ 'e-disabled': disabled }, plain ? `e-${type}-button-plain` : '', `e-${type}-button`, `e-${size}-button`]"
    :hover-class="hoverClass"
    class="e-button"
  >
    <text v-if="loading && !disabled" class="e-button_loading-text">{{ loadingText }}</text>
    <slot v-else></slot>
  </button>
</template>

<script lang="ts">
import { Component, Mixins, Prop, Vue } from "vue-property-decorator"
import mixin from '../_mixins/mixins'

@Component
export default class EButton extends Mixins(mixin) {
  @Prop({
    type: String,
    default: 'primary'
  }) private type!: string // 按钮样式
  @Prop({
    type: String,
    default: 'default'
  }) private size!: string // 按钮大小
  @Prop(String) private openType!: string // 开放能力 与uniapp官方相同
  @Prop(String) private color!: string // 字体颜色
  @Prop(String) private loadingText!: string // 加载文字
  @Prop([String, Number]) private width!: string | number // 按钮宽度
  @Prop([String, Number]) private height!: string | number // 按钮高度
  @Prop([String, Number]) private fontSize!: string | number // 字体大小
  @Prop([String, Number]) private borderRadius!: string | number // 按钮圆角
  @Prop(Boolean) private plain!: boolean // 镂空按钮
  @Prop(Boolean) private disabled!: boolean // 按钮失效
  @Prop(Boolean) private loading!: boolean // 按钮加载
  @Prop(Boolean) private square!: boolean // 方形按钮
  @Prop(Boolean) private round!: boolean // 圆形按钮
  @Prop({
    type: Object,
    default: () => ({})
  }) private customStyle!: any // 自定义样式

  private buttonHeight!: number

  // 按钮样式
  get buttonStyle() {
    const {
      addUnit,
      borderRadius,
      color,
      customStyle,
      fontSize,
      height,
      round,
      square,
      width
    } = this
    const buttonStyle: any =  {
      color,
      fontSize: addUnit(fontSize)
    }
    if (width) buttonStyle.width = addUnit(width)
    if (height) {
      buttonStyle.height = addUnit(height)
      buttonStyle.lineHeight = addUnit(height)
    }
    if (square) buttonStyle.borderRadius = 0
    if (round) buttonStyle.borderRadius = this.buttonHeight + 'px'
    if (borderRadius) buttonStyle.borderRadius = addUnit(borderRadius)
    return { buttonStyle, ...customStyle }
  }
  // 按钮hover效果
  get hoverClass () {
    const { disabled, loading } = this
    if (disabled || loading) return ''
    return 'e-hover'
  }

  private mounted() {
    this.getRect('.e-button').then(rect => {
      this.buttonHeight = rect.height
    })
  }

  public handleTap(e: any) {
    const { disabled, loading } = this
    if (disabled || loading) return
    this.$emit('click', e)
  }
}
</script>

<style lang="scss" scoped>
@import '../_styles/layout.scss';
.e-button {
  box-sizing: border-box;
  font-weight: 500;
  font-size: 14px;
  &::after {
    width: 0;
    height: 0;
    border: none;
  }
  &_loading-text {
    margin-left: 8rpx;
  }
}

// 按钮特色样式
.e-primary-button {
  background: $e-primary-color;
  color: #fff;
}
.e-primary-button-plain {
  background: transparent;
  border: solid 1px $e-primary-color;
  color: $e-primary-color;
}
.e-success-button {
  background: $e-success-color;
  color: #fff;
}
.e-success-button-plain {
  background: transparent;
  border: solid 1px $e-success-color;
  color: $e-success-color;
}
.e-warning-button {
  background: $e-warning-color;
  color: #fff;
}
.e-warning-button-plain {
  background: transparent;
  border: solid 1px $e-warning-color;
  color: $e-warning-color;
}
.e-error-button {
  background: $e-error-color;
  color: #fff;
}
.e-error-button-plain {
  background: transparent;
  border: solid 1px $e-error-color;
  color: $e-error-color;
}

.e-disabled {
  background: $e-disabled-color;
  color: #fff;
}

// 按钮大小样式
.e-mini-button {
  @include e-mini-button
}
.e-middle-button {
  @include e-middle-button
}
.e-default-button {
  @include e-default-button
}
</style>