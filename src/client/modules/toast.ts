let timeout
export default (text: string = '', status: string = 'success', fixed: boolean = false ) => {
  clearTimeout(timeout)
  // only worked on client
  if(typeof window != "undefined") {
    let toast = <HTMLElement>document.getElementById('toast-oopsreview')
    toast.style.bottom = "10px"
    toast.className = status 
    toast.innerHTML = text
    if(!fixed) {
      timeout = setTimeout(() => {
        toast.style.bottom = "-100px"
      }, 5000)
    }
  }
}
