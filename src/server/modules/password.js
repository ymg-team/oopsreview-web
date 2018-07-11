import bcrypt from 'bcrypt'

/**
 * @description enc password
 * @param {string} password 
 * @see https://stackoverflow.com/questions/14015677/node-js-encryption-of-passwords
 */
export function encPassword(password='', callback) {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) 
      return callback(err);

      console.log('salt', salt)

    bcrypt.hash(password, '$2a$10$fmIFy1LJU9Zsxy.RhhDIre', (err, hash) => {
      console.log(hash)
      return callback(err, hash)
    })
  })
}
