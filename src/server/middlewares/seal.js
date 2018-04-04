const { APP_KEY, NODE_ENV } = process.env
import response from '../modules/response'

/**
 * function to generate url seal
 * formula : base64(APP_KEY + timestamp).replace all '='
 * @return {string} seal ready to use
 */
export function generateSeal()
{
    if(typeof window == 'undefined') 
        return Buffer.from(APP_KEY + String(Date.now())).toString('base64').replace(/=/g, '')
    else
        return (btoa(APP_KEY + String(Date.now()))).replace(/=/g, '')
}

/**
 * function to decrypted url seal
 * @param {string} seal 
 */
export function getTimestampSeal(seal)
{
  // server mode
  if(typeof window == 'undefined')
      return (Buffer.from( seal, 'base64').toString()).replace(APP_KEY, '')
  // client mode
  else
      return atob(`${seal}==`).replace(APP_KEY, '')
}

/**
 * function to validate seal : only for production
 * @param {string} seal 
 */
export function validateSeal(seal) {
  const diff = Date.now() - getTimestampSeal(seal)
  if((isNaN(diff) || diff >= 60000) && NODE_ENV != 'development') //seal only active 1 minutes = 60000 miliseconds
      return { valid: false }
  else 
      return { valid: true }
}

export default (req, res, next) => {
  const { seal } = req.params 
  if(validateSeal(seal).valid) {
    return next()
  } else {
    return res.send(403, response(403, 'seal not valid'))
  }
}