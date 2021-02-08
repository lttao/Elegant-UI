// 获取数据类型
export function getTypeof(value: any): string {
    const type = typeof value
    if (type !== 'object') return type
    return Object.prototype.toString
        .call(value)
        .replace(/\[(\w+)\s+(\w+)\]/, '$2')
        .toLowerCase()
}