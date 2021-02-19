import { Component, Vue } from 'vue-property-decorator'
import { addUnit } from '../_utils'

interface rect {
  bottom: number
  dataset: any
  height: number
  id: string
  left: number
  right: number
  top: number
  width: number
}

@Component
export default class Mixins extends Vue {
  // 获取dom节点信息
  public getRect(selector: string, all?: boolean): Promise<rect> {
    return new Promise((resolve) => {
      uni
        .createSelectorQuery()
        .in(this)
        [all ? 'selectAll' : 'select'](selector)
        .boundingClientRect((rect) => {
          if (all && Array.isArray(rect) && rect.length) {
            resolve(rect)
          } else if (!all && rect) {
            resolve(rect)
          }
        })
        .exec()
    })
  }

  // 添加单位
  public addUnit = addUnit
}