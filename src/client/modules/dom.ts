export function injectCss(href: string, cb: Function | null) {
  if(!isStyleLoaded(href)) {
    const l: HTMLElement | null = document.createElement('link')
    l.setAttribute('rel', 'stylesheet')
    l.setAttribute('href', href)
    if(cb)
      l.onload = cb() 
    document.body.appendChild(l)
  }
}

export function injectScript(src: string, args: any) {
  if(!isScriptLoaded(src)) {
    const s: HTMLElement | null = document.createElement('script')
    s.setAttribute('src', src)
    if(args.id) s.setAttribute('id', args.id)
    if(args.cb)
      s.onload = args.cb()
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

function isStyleLoaded(href: string) {
  const styles: any = document.querySelectorAll('link[rel=\'stylesheet\']')
  // is css loaded
  for (let i = styles.length; i--;) {
    if(styles[i].href == href) return true
  }
}
