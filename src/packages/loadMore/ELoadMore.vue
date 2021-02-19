<template>
    <view class="e-load-more">
        <block v-if="status === 'LOADING'"></block>
        <block v-else-if="status === 'NODATA'"></block>
        <block v-else-if="status === 'NOMORE'"></block>
        <block v-else-if="status === 'MORE'"></block>
    </view>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ELoadingIcon from '../icon/ELoadingIcon.vue'
import EEmpty from '../empty/EEmpty.vue'

@Component({
    components: { ELoadingIcon, EEmpty }
})
export default class ELoadMore extends Vue {
    @Prop(String) status!: string
}
</script>