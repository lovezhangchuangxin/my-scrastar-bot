/**
 * 获取有类型的 Memory（现在的 Memory全局对象并未类型导致没法扩展，后续 Memory 类型规范后就不需要该函数了）
 */
export function getMemory(): Memory {
  return Memory as Memory;
}
