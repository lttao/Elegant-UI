<template>
  <view :style="[buttonStyle]">按钮</view>
</template>

<script lang="ts">
import { Component, Mixins, Prop, Vue } from "vue-property-decorator"
import mixin from '../_mixins/mixins'

@Component
export default class EButton extends Mixins(mixin) {
  @Prop({
    type: String
  }) public color!: string
  @Prop({
    type: [String, Number]
  }) public fontSize!: string | number

  get buttonStyle() {
    const {
      color,
      fontSize
    } = this
    return {
      color,
      fontSize: this.addUtil(fontSize)
    }
  }

}
</script>

<style lang="scss" scoped>
  
</style>