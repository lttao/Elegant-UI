<template>
    <view :style="[containerStyle]"  class="e-tab">
      <scroll-view scroll-x class="e-scroll-view" :scroll-left="scrollLeft" scroll-with-animation>
        <view class="e-scroll-box e-tabs-scorll-flex" :style="{ height: addUnit(height), padding: `0 ${addUnit(margin)}` }">
          <block v-for="(item, index) in list" :key="index">
            <view @click="clickTab(index)" :style="[tabItemStyle(index)]" :class="{ 'between-tab-item': index === 0 || index === list.length - 1 }" class="e-tab-item">
              <view class="tab-item">
                <text>{{ item.label || item }}</text>
                <view v-if="item.num" class="tab-num">{{ item.num > 99 ? '99+' : item.num }}</view>
              </view>
            </view>
          </block>

          <!-- tab 样式 -->
          <view :style="[tabLineStyle]" class="e-tab-line">
            <view v-if="!$slots.tabLine" :style="[{ width: addUnit(lineWidth), height: addUnit(lineHeight), background: activeColor }]"></view>
            <slot name="tabLine"></slot>
          </view>
        </view>
      </scroll-view>
    </view>
</template>

<script>
import mixin from '../_mixins/mixins'
export default {
  name: 'eTabs',
  mixins: [mixin],
  props: {
    // 导航菜单是否需要滚动，如只有2或者3个的时候，就不需要滚动了，此时使用flex平分tab的宽度
    scroll: {
      type: Boolean,
      default: true
    },
    // 需循环的标签列表
    list: {
      type: Array,
      default: () => []
    },
    // 如果数据结构是对象，设置key
    listKey: {
      type: [String],
      default: ''
    },
    // 当前活动tab的索引
    current: {
      type: [Number, String],
      default: 0
    },
    // 高度
    height: {
      type: [String, Number],
      default: 80
    },
    // 背景颜色
    background: {
      type: String,
      default: ''
    },
    // 是否开启固定
    fixed: {
      type: Boolean,
      default: false
    },
    // 固定层级
    zIndex: {
      type: Number,
      default: 99
    },
    // 开启固定距离头部的高度
    offsetTop: {
      type: [String, Number],
      default: 0
    },
    // H5导航栏高度
    h5NavHeight: {
      type: [String, Number],
      default: 44
    },
    // 横线宽度
    lineWidth: {
      type: [String, Number],
      default: '50%'
    },
    // 横线高度
    lineHeight: {
      type: [String, Number],
      default: 4
    },
    // 每一项的样式
    itemStyle: {
      type: Object,
      default: () => ({})
    },
    // 默认颜色
    defaultColor: {
      type: String,
      default: '#666'
    },
    // 选中颜色
    activeColor: {
      type: String,
      default: '#000'
    },
    // 选中样式 暂时不支持会改变宽度的属性
    activeStyle: {
      type: Object,
      default: () => ({})
    },
    // 动画时间
    duration: {
      type: [String, Number],
      default: 300
    },
    fontSize: {
      type: Number,
      default: 14
    },
    // 边距
    margin: {
      type: [String, Number],
      default: 0
    },
    // 间隙距离
    gap: {
      type: [String, Number],
      default: 16
    },
    // 是否开启缩放
    scale: Boolean,
    // 未选中字体缩小比例
    scaleValue: {
      type: Number,
      default: 0.85
    },
    // 未选中字体是否加粗
    bold: Boolean,
    // 滑动底部 距离tabs底部的距离
    lineBottom: {
      type: [String, Number],
      default: 0
    },
    // 是否自定义头部
    customNav: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      itemsDomInfo: [],
      isRenderAnimation: false // 渲染时是否触发动画
    }
  },
  watch: {
    list(n, o) {
        console.log('init')
      // list变动时，重制内部索引，否则可能导致超出数组边界的情况
      if (n.length !== o.length) this.currentIndex = 0
      // 用$nextTick等待视图更新完毕后再计算tab的局部信息，否则可能因为tab还没生成就获取，就会有问题
      this.$nextTick(() => {
        this.init()
      })
    },
    current(n, o) {
      if (n !== o) this.isRenderAnimation = true
    }
  },
  computed: {
    containerStyle() {
      const { addUnit, height, fixed, background } = this
      const style = {
        width: '100%',
        height: addUnit(height),
        background
      }
      if (fixed) {
        const { zIndex, h5NavHeight, customNav, offsetTop } = this
        style.position = 'fixed'
        style.zIndex = zIndex

        // #ifdef H5
        if (customNav) style.top = `${uni.upx2px(offsetTop)}px`
        else style.top = `${uni.upx2px(offsetTop) + h5NavHeight}px`
        // #endif
        // #ifndef H5
        style.top = `${uni.upx2px(offsetTop)}px`
        // #endif
      }
      return style
    },
    tabItemStyle() {
      return (index) => {
        const { itemStyle, addUnit, height, current, defaultColor, activeColor, activeStyle, gap, scale, fontSize, bold, duration, scaleValue } = this
        let style = {
          ...itemStyle,
          // flex: scroll ? 'auto' : 1,
          height: addUnit(height),
          lineHeight: addUnit(height),
          transition: `transform ${duration ? `${duration}ms` : duration}`,
          color: current === index ? activeColor : defaultColor,
          padding: `0 ${addUnit(gap)}`,
          fontSize: fontSize + 'px',
          fontWeight: bold && !scale ? 'bold' : 'normal',
          transform: scale ? `scale(${scaleValue})` : 'scale(1)'
        }
        if (current === index) {
          style = { ...style, ...activeStyle, transform: 'scale(1)', fontWeight: 'bold' }
        }
        return style
      }
    },
    tabLineStyle() {
      const { isRenderAnimation, current, itemsDomInfo, duration, margin, lineBottom, addUnit } = this
      let tabBarWidth = 0
      let tabBarPosition = 0
      const currentItemInfo = itemsDomInfo[current] // 当前选中item的DOM信息
      if (currentItemInfo) {
        tabBarWidth = currentItemInfo.width
        tabBarPosition = currentItemInfo.left
      }
      const style = {
        width: `${tabBarWidth}px`,
        bottom: addUnit(lineBottom),
        transition: isRenderAnimation && `all ${duration}ms`,
        transform: `translate3d(${tabBarPosition + uni.upx2px(margin)}px, 0, 0)`
      }
      return style
    },
    scrollLeft() {
      const { itemsDomInfo, current } = this
      if (current <= 1) return 0

      const currentItem = itemsDomInfo[current]
      const frontItem = itemsDomInfo[current - 1]

      if (currentItem && frontItem) return currentItem.left - frontItem.width

      return 0
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    // 初始化数据
    init() {
      this.isRenderAnimation = false
      this.getRect('.e-tab-item', true).then((res = []) => {
        if (res.length) {
          this.itemsDomInfo = res.map((e, i, arr) => {
            return {
              ...e,
              left: e.left - arr[0].left
            }
          })

          this.tabBarWidth = res[0].width
        }
      })
    },
    // 点击某一个tab菜单
    clickTab(index) {
      // 点击当前活动tab，不触发事件
      if (index === this.current) return
      // 发送事件给父组件
      this.$emit('change', index)
    }
  }
}
</script>

<style lang="scss" scoped>
// ::v-deep ::-webkit-scrollbar {
//   display: none;
//   width: 0 !important;
//   height: 0 !important;
//   -webkit-appearance: none;
//   background: transparent;
// }
.e-tab {
    width: 100%;
}

.e-scroll-box {
  position: relative;
  overflow: hidden;
}

.e-scroll-view {
  width: 100%;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
}

.e-tab-item {
  position: relative;
  z-index: 1;
  flex: 1;
  display: inline-block;
  text-align: center;
  transition-property: background-color, color;
  box-sizing: border-box;
}
.between-tab-item {
  flex: 0 !important;
  padding: 0 28rpx !important;
}

.e-tab-line {
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  overflow: hidden;
}

.e-tabs-scorll-flex {
  display: flex;
//   justify-content: space-between;
}

.tab-item {
  position: relative;
  display: inline-block;
  .tab-num {
    position: absolute;
    top: 6rpx;
    left: 95%;
    min-width: 12px;
    height: 12px;
    background: #004d47;
    padding: 0 8rpx;
    text-align: center;
    line-height: 12px;
    font-weight: 400;
    font-size: 10px;
    color: #fff;
  }
}
</style>
