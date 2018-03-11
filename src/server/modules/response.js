export default (code = 500, message = 'something wrong', data = {}) => {
  let response = {}
  
  switch(code) {
    default :
      response = {
        code,
        message
      }
      break
  }
  
  return response
}