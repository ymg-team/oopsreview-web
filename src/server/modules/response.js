export default (code = 500, message = 'something wrong', data = {}) => {
  let response = {}

  if(Object.keys(data).length > 0) response = data
  
  switch(code) {
    case 200 :
      response.code = code
      break

    default :
      response.code = code 
      response.message = message
      break
  }
  
  return response
}
