const static_data = [
  {
    "index": "about",
    "created_at": 1530193444, 
    "title": "about",
    "image": "",
    "html": '<p>Oopsreview is software reviewer for various platforms and powered by <a href="https://byidmore.com" target="_blank" rel="noopener">Id More</a>. Oopsreview founded by <a href="https://yussan.github.io" target="_blank" rel="noopener">Yusuf A.H. aka Yussan</a>, this is 2017. Comes from a hobby to try an app and recommend to friends. Oppsreview helps you get to know more about software that are booming right now, until finally you will decide to use the software or not.</p>'
  },
  {"index": "terms-conditions",
    "created_at": 1530193444, 
    "title": "terms and conditions",
    "image": "",
    "html": '<h4>content</h4><p>content created in Oopsreview is 100% made from Oopsreview authors. Written by experience after the use of the software in a few days. The posted images are the result of screenshots and some digital editing to produce images that interest the reader. If there is content that we collect from sources outside of Oopsreview, we will include links and source references from the content.&nbsp;we will not publish software that smells pornography, SARA or software that is private.</p><p>&nbsp;</p>'
  },
  {
    "index": "privacy-policy",
    "created_at": 1530193444,
    "title": "privacy policy",
    "image": "",
    "html": '<h4>last update 13 Juli 2018</h4><p>Oopsreview&nbsp;currently does not require any data from users, be it personal data or use of cookies. Thank you for your attention.</p>'
  }
]

export function getData(index: String): Object {
  let data
  static_data.map((n: any) => {
    if(n.index === index) {
      data = n
    }
  })

  return data
}
