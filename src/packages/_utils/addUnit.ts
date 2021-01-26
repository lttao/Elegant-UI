// 添加单位
export function addUnit(value: string | number, unit: string = 'rpx'): string {
    value = String(value)
    return /^\d+$/.test(value) ? `${value}${unit}` : value
}