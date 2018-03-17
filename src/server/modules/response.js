export default (code = 500, message = 'something wrong', data = {}) => {
  let response = {}
  
  switch(code) {
    case 200 :
      response = data
      response.code = code
      break

    default :
      response = {
        code,
        message
      }
      break
  }
  
  return response
}