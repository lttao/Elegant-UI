// 添加单位
export function addUtil(value: string | number, unit: string = 'rpx') {
    value = String(value)
    return /^\d+$/.test(value) ? `${value}${unit}` : value
}