
// 封装防抖函数
export function debounce (func, delay) {
  let timer = null
  return function (...args) {
    if (timer)  clearTimeout(timer)
    timer  = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

// 封装时间过滤器
export function dateFormat (originVal) {
  // 字符串补全长度 padStart()用于头部补全 padEnd()用于尾部补全
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
}
