export default (status = 500, message = 'something wrong', data = {}) => {
  let response = {}

  if(Object.keys(data).length > 0) response = data
  
  switch(status) {
    case 200 :
      response.status = status
      break

    default :
      response.status = status 
      response.message = message
      break
  }
  
  return response
}
