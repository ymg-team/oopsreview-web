import * as authApi from '../handlers/api/auth'

export default (route) => {
  route.post('/api/login', authApi.login)
  route.post('/api/checklogin', authApi.checkLogin)
  route.post('/api/logout', authApi.logout)
}
