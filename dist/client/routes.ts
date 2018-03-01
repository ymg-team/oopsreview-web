import Home from './containers/home/index.vue'
import Error from './containers/error/index.vue'
import Post from './containers/post/index.vue'
import PostDetail from './containers/post/detail.vue'

import DefaultLayout from './layouts/default.vue'
import ErrorLayout from './layouts/error.vue'

export default [
  // { 
  //   path: '/', 
  //   component: DefaultLayout, 
  //   children : [
  //     { path: '/', component: Home },
  //     { path: '/posts', component: Post },
  //     { path: '/search', name: 'search', component: Post },
  //     { path: '/tag/:tag_name', props: true, component: Post },
  //     { path: '/post/:title-:id', name: 'post-detail', component: PostDetail }
  //   ]
  // },
  { 
    path: '*', 
    component:  ErrorLayout,
    children : [
      { path: '*', component: Error }
    ]
  }
]