<template>
    <block v-if="status === 'EMPTY'">
        <e-empty :text="emptyText" />
    </block>
    <view v-else class="e-load-more">
        <block v-if="status === 'LOADING'">
            <e-loading-icon size="20px" color="#909090" class="e-loading-icon" />
            <text class="e-load-more_text">{{ loadingText }}</text>
        </block>
        <block v-else-if="status === 'END'">
            <text class="e-load-more_text">{{ endText }}</text>
        </block>
        <block v-else-if="status === 'MORE'">
            <text class="e-load-more_text">{{ moreText }}</text>
        </block>
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
    @Prop({
        type: String,
        default: '加载中...'
    }) loadingText!: string
    @Prop({
        type: String,
        default: '上拉加载更多'
    }) moreText!: string
    @Prop({
        type: String,
        default: '已经到底了'
    }) endText!: string
    @Prop({
        type: String,
        default: '已经到底了'
    }) emptyText!: string
}
</script>

<style lang="scss" scoped>
.e-load-more {
    height: 100rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #ccc;
}
.e-loading-icon {
    margin-right: 20rpx;    
}
</style>