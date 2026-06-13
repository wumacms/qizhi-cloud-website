/**
 * 轻量级 HTML 消毒工具，仅保留安全的内联标签。
 * 用于清理 v-html 绑定的内容，防止 XSS 攻击。
 */

const ALLOWED_TAGS = new Set(['BR', 'STRONG', 'EM', 'B', 'I', 'SPAN', 'SUB', 'SUP'])

function sanitizeNode(node: Node): DocumentFragment {
  const frag = document.createDocumentFragment()
  for (const child of Array.from(node.childNodes)) {
    if (child.nodeType === Node.TEXT_NODE) {
      frag.appendChild(child.cloneNode())
    } else if (child.nodeType === Node.ELEMENT_NODE) {
      const el = child as Element
      if (ALLOWED_TAGS.has(el.tagName)) {
        const safeEl = document.createElement(el.tagName)
        // 不复制任何属性（移除事件处理器、style 等）
        safeEl.appendChild(sanitizeNode(el))
        frag.appendChild(safeEl)
      } else {
        // 移除标签但保留纯文本子节点
        frag.appendChild(sanitizeNode(el))
      }
    }
  }
  return frag
}

export function sanitizeHtml(dirty: string): string {
  const doc = new DOMParser().parseFromString(dirty, 'text/html')
  const fragment = sanitizeNode(doc.body)
  const container = document.createElement('div')
  container.appendChild(fragment)
  return container.innerHTML
}
