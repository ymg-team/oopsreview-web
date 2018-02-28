export function injectScript(src: string, cb: Function | null) {
  if(!isScriptLoaded(src))
    {
        const s: HTMLElement | null = document.createElement('script')
        s.setAttribute('src', src)
        if(cb)
          s.onload = cb()
        document.body.appendChild(s)
    }
}

function isScriptLoaded(src: string) {
  const scripts = document.getElementsByTagName('script')
  // is script available
  for (let i = scripts.length; i--;) {
      if (scripts[i].src == src) return true
  }

  return false
}