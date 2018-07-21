import {enc, AES, MD5} from "crypto-js"

const KEY = 'oopsreview-web'

/**
 * @description function to encrypt password
 * @param {string} string
 */
export function encString(plaintext = "") {
  const enc = AES.encrypt(plaintext, KEY).toString()
  // console.log("enc plain", plaintext)
  // console.log("enc result", enc)
  return enc
}

/**
 * @description function to decrypt script
 * @param {string} ciphertext 
 */
export function decString(ciphertext = "") {
  const dec = AES.decrypt(ciphertext, KEY).toString(enc.Utf8)
  // console.log("dec", dec)
  return dec 
}

/**
 * @description function to hash password with md5
 * @param {string} password as plain text
 */
export function hashPassword(password = "") {
  const hash = MD5(password).toString()
  // console.log("hash", hash)
  return hash
}
