<template>
    <view class="e-sticky">
        <slot />
    </view>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

function getCurrentPage() {
  const pages = getCurrentPages();
  return pages[pages.length - 1];
}

@Component
export default class ESticky extends Vue {
    @Prop({
        type: [String, Number],
        default: 0
    }) offsetTop!: string | number

    private scrollTop!: string

    private mounted() {
        console.log(getCurrentPage());
    }

    onScroll({ scrollTop }: any = {}) {
        console.log(scrollTop);
    }
}
</script>